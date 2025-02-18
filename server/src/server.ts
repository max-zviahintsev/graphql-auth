import { createServer } from 'node:http'
import { createYoga, createSchema } from 'graphql-yoga'
import {
  createInlineSigningKeyProvider,
  extractFromHeader,
  useJWT,
} from '@graphql-yoga/plugin-jwt'
import { mongoConnect } from './services/mongo.ts'
import { typeDefs } from './schema/typeDefs.ts'
import { userResolvers } from './resolvers/user.resolvers.ts'

await mongoConnect()

export const schema = createSchema({
  typeDefs,
  resolvers: userResolvers,
})

const signingKey = process.env.JWT_SECRET as string

const yoga = createYoga({
  schema,
  plugins: [
    useJWT({
      signingKeyProviders: [createInlineSigningKeyProvider(signingKey)],
      tokenLookupLocations: [
        extractFromHeader({ name: 'authorization', prefix: 'Bearer' }),
      ],
      tokenVerification: {
        issuer: ['http://localhost'],
        audience: 'my-audience',
        algorithms: ['HS256', 'RS256'],
      },
      extendContext: true,
      reject: {
        missingToken: false,
        invalidToken: true,
      },
    }),
  ],
})
const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
