import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
import { serialize } from 'cookie'
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
    me: async (_: unknown, __: unknown, ctx: JwtContext) => {
      if (!ctx.jwt) {
        return null
      }

      const { userId } = ctx.jwt.payload
      const objectId = new ObjectId(userId)
      const user = await userModel.findById(objectId)
      return user
    },
  },

  Mutation: {
    register: async (
      _: unknown,
      args: { email: string; password: string },
      { request }: JwtContext,
    ) => {
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
      const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
        sameSite: 'strict',
        path: '/',
      })

      await request.cookieStore?.set(cookie)
      return { user }
    },

    login: async (
      _: unknown,
      args: { email: string; password: string },
      { request }: JwtContext,
    ) => {
      const { email, password } = args
      const user = await userModel.findOne({ email })

      if (!user || !(await user.comparePassword(password))) {
        throw new GraphQLError('Invalid email or password', {
          extensions: { code: 'INVALID_CREDENTIALS' },
        })
      }

      const token = generateToken(user)
      const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
        sameSite: 'strict',
        path: '/',
      })

      await request.cookieStore?.set(cookie)

      return true
    },

    logout: async (_: unknown, __: unknown, { request }: JwtContext) => {
      const clearCookie = serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
      })
      await request.cookieStore?.set(clearCookie)

      return true
    },
  },
}

export { userResolvers }
