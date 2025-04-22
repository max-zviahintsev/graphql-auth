import type { YogaInitialContext } from 'graphql-yoga'
import type { JwtPayload } from 'jsonwebtoken'

export interface JwtContext extends YogaInitialContext {
  jwt?: JwtPayload
}

export type User = {
  id: string
  email: string
  password: string
  comparePassword(candidatePassword: string): Promise<boolean>
}
