import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { ZodFilter } from './exceptions/zod-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  // Set a global prefix for all routes in your application
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Guestic API')
    .setDescription('The API for the Guestic Backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api/docs`, app, document);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://guestic.onrender.com',
      'http://guestic.onrender.com',
      'https://guesticapp.onrender.com',
      'http://guesticapp.onrender.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Content-Length',
      'Cookie',
      'Referer',
      'User-Agent',
      'Authorization',
    ],
    exposedHeaders: ['Authorization', 'Set-Cookie'],
    credentials: true,
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(compression());
  app.use(cookieParser());
  app.use(helmet());

  app.useGlobalFilters(new ZodFilter());

  await app.listen(port);
}
bootstrap();
