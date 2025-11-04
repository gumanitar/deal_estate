import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DataSource } from 'typeorm';
import { dealsInserter } from './deals/utils/deals.inserter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      process.env.BASE_URL,
      'http://127.0.0.1:5173',
      'http://localhost:5173',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
    maxAge: 86400,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = {};

        errors.forEach((err) => {
          if (err.constraints) {
            formattedErrors[err.property] = Object.values(err.constraints)[0];
          } else if (err.children?.length) {
            err.children.forEach((child) => {
              if (child.constraints) {
                formattedErrors[child.property] = Object.values(
                  child.constraints,
                )[0];
              }
            });
          }
        });

        return new BadRequestException(formattedErrors);
      },
    }),
  );

 
  const dataSource = app.get(DataSource);
  await dealsInserter(dataSource);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
