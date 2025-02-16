import { createServer } from 'node:http'
import { createYoga, createSchema } from 'graphql-yoga'
import { mongoConnect } from './services/mongo.ts'

export const schema = createSchema({
  typeDefs: `
      type Query {
        hello: String
      }
    `,
  resolvers: {
    Query: {
      hello: () => 'world',
    },
  },
})

const yoga = createYoga({ schema })

const server = createServer(yoga)

await mongoConnect()

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
