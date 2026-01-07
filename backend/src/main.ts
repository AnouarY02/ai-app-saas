import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const port = process.env.PORT || process.env.BACKEND_PORT || 4000;
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(cors());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();
  await app.listen(port);
  Logger.log(`Backend listening on port ${port}`);
}

bootstrap();
