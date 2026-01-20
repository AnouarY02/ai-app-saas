import dotenv from 'dotenv';
dotenv.config();
import app from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

const server = app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server listening on port ${PORT}`);
});

const shutdown = () => {
  console.log(`[${new Date().toISOString()}] Shutting down server...`);
  server.close(() => {
    console.log(`[${new Date().toISOString()}] Server closed.`);
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
