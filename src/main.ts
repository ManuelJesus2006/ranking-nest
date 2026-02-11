import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log(process.cwd());
  console.log(require('fs').readdirSync(process.cwd()));
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: false
      }}))
}
bootstrap();
