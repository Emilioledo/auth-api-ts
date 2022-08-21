import express from 'express'
import database from './database'
import authRoutes from './routes/auth-routes'
import dotenv from 'dotenv'

const main = async () => {
  const app = express()
  dotenv.config()
  database.connectdb()

  app.use(express.json())
  app.use('/auth', authRoutes)

  app.listen(process.env.PORT, () => {
    console.info(
      `🚀 Server ready and listening at ==> http://localhost:${process.env.PORT}`,
    )
  })
}

main().catch((error) => {
  console.error('Server failed to start', error)
})
