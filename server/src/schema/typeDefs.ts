import { mergeTypeDefs } from '@graphql-tools/merge'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootQuerySchema = readFileSync(path.join(__dirname, 'rootQuery.graphql'), 'utf8')
const userSchema = readFileSync(path.join(__dirname, 'user.graphql'), 'utf8')

const typeDefs = mergeTypeDefs([rootQuerySchema, userSchema])

export { typeDefs }
