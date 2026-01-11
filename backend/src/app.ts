// Express app setup
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import healthRouter from './routes/health'
import { notFoundHandler, errorHandler } from './middleware/errorHandlers'

dotenv.config()

const app: Application = express()

// Enable CORS for all origins in development
app.use(cors())

// JSON body parsing
app.use(express.json())

// Health check route
app.use('/health', healthRouter)

// 404 handler
app.use(notFoundHandler)

// Error handler
app.use(errorHandler)

export default app
