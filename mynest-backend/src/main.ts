/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const uploadsPath =
    process.env.NODE_ENV === 'production'
      ? join(__dirname, 'uploads')
      : join(process.cwd(), 'src/uploads');

  app.use('/uploads', express.static(uploadsPath));
  await app.listen(process.env.NEST_PORT ?? 3000);
}
bootstrap();
