import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
import userModel from '../models/user.model.ts'
import { JwtContext, User } from './../types.ts'

const JWT_SECRET = process.env.JWT_SECRET as string
const { ObjectId } = Types

const generateToken = (user: User) =>
  jwt.sign({ userId: user.id }, JWT_SECRET, {
    audience: 'max-horo',
    issuer: 'http://localhost',
    expiresIn: '1h',
  })

const userResolvers = {
  Query: {
    user: async (_: unknown, __: unknown, ctx: JwtContext) => {
      try {
        if (!ctx.jwt) {
          throw new GraphQLError('Unauthorized')
        }

        const { userId } = ctx.jwt.payload
        const objectId = new ObjectId(userId)
        const user = await userModel.findById(objectId)
        return user
      } catch (error) {
        console.error('Error fetching user:', error) // eslint-disable-line
        throw new Error('Failed to fetch user')
      }
    },
  },

  Mutation: {
    register: async (_: unknown, args: { email: string; password: string }) => {
      try {
        const { email, password } = args

        const isUserExists = await userModel.findOne({ email })
        if (isUserExists) {
          throw new GraphQLError('User already exists', {
            extensions: { code: 'USER_ALREADY_EXISTS' },
          })
        }

        const user = new userModel({ email, password })
        await user.save()

        const token = generateToken(user)
        return { token, user }
      } catch (error) {
        console.error('Error registering user:', error) // eslint-disable-line
        throw new Error('Failed to register user')
      }
    },

    login: async (_: unknown, { email, password }: { email: string; password: string }) => {
      try {
        const user = await userModel.findOne({ email })

        if (!user || !(await user.comparePassword(password))) {
          throw new GraphQLError('Invalid email or password', {
            extensions: { code: 'INVALID_CREDENTIALS' },
          })
        }

        const token = generateToken(user)
        return { token, user }
      } catch (error) {
        console.error('Error logging in:', error) // eslint-disable-line
        throw new Error('Failed to log in')
      }
    },

    logout: () => true,
  },
}

export { userResolvers }
