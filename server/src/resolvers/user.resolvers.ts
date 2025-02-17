import { User } from './../types.ts'

const userResolvers = {
  Query: {
    user: async (): Promise<User> => {
      try {
        return await {
          id: '1',
          email: 'test@test.com',
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        throw new Error('Failed to fetch user')
      }
    },
  },

  Mutation: {
    register: async (): Promise<User> => {
      try {
        return await {
          id: '1',
          email: 'test@test.com',
        }
      } catch (error) {
        console.error('Error registering user:', error)
        throw new Error('Failed to register user')
      }
    },
    login: async (): Promise<User> => {
      try {
        return await {
          id: '1',
          email: 'test@test.com',
        }
      } catch (error) {
        console.error('Error logging in:', error)
        throw new Error('Failed to log in')
      }
    },
    logout: async (): Promise<void> => {
      try {
        return
      } catch (error) {
        console.error('Error logging out:', error)
        throw new Error('Failed to log out')
      }
    },
  },
}

export { userResolvers }
