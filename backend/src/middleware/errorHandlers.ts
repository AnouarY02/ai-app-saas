// Error handling middleware
import { Request, Response, NextFunction } from 'express'

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  const ts = new Date().toISOString()
  console.warn(`[${ts}] 404 Not Found: ${req.method} ${req.originalUrl}`)
  res.status(404).json({ error: 'Not Found' })
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const ts = new Date().toISOString()
  console.error(`[${ts}] 500 Internal Server Error:`, err)
  res.status(500).json({ error: 'Internal Server Error' })
}
