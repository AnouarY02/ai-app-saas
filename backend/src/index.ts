// Server bootstrap
import app from './app'

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000

const server = app.listen(PORT, () => {
  const ts = new Date().toISOString()
  console.log(`[${ts}] Backend server listening on port ${PORT}`)
})

function shutdown(signal: string) {
  const ts = new Date().toISOString()
  console.log(`[${ts}] Received ${signal}, shutting down gracefully...`)
  server.close(() => {
    console.log(`[${ts}] Server closed. Exiting.`)
    process.exit(0)
  })
  // Force exit after 10s
  setTimeout(() => {
    console.error(`[${ts}] Force exit after timeout.`)
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
