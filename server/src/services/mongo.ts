import mongoose from 'mongoose'

const uri = process.env.MONGO_URL as string

const clientOptions: mongoose.ConnectOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
}

async function gracefulShutdown() {
  try {
    await mongoose.disconnect()
    if (process.env.NODE_ENV !== 'test') {
      process.exit(0)
    }
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error)
  }
}

async function mongoConnect() {
  const { readyState, db } = mongoose.connection
  if (readyState) {
    return
  }

  try {
    await mongoose.connect(uri, clientOptions)
    await db?.admin().command({ ping: 1 })
    console.log('Connected to MongoDB')

    const exitEvents = [
      `exit`,
      `SIGINT`,
      `SIGTERM`,
      `SIGUSR1`,
      `SIGUSR2`,
      `uncaughtException`,
      `beforeExit`,
    ]
    exitEvents.forEach((event) => {
      process.on(event, gracefulShutdown)
    })
  } catch (err) {
    console.error(err)
  }
}
mongoConnect()

export { mongoConnect }
