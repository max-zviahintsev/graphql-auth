import { createServer } from 'node:http'
import { createYoga, createSchema } from 'graphql-yoga'
import { mongoConnect } from './services/mongo.ts'
import { typeDefs } from './schema/typeDefs.ts'
import { userResolvers } from './resolvers/user.resolvers.ts'

await mongoConnect()

export const schema = createSchema({
  typeDefs,
  resolvers: userResolvers,
})

const yoga = createYoga({ schema })
const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
