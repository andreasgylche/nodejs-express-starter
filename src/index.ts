import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import errorhandler from 'errorhandler'
import morgan from 'morgan'
import dotenv from 'dotenv'

import helloRouter from './routes/hello'

dotenv.config()

const app = express()

app.use(express.json())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

// Routes
app.use('/hello', helloRouter)
app.get('/', (req, res) =>
  res.status(200).json({ message: 'Server is running' })
)

// Error handling
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}

const PORT = process.env.NODE_PORT || 6001

app.listen(PORT, () => {
  console.log(`🏃 Server running on port ${PORT}`)
})
