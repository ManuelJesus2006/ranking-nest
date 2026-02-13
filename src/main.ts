import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log(process.cwd());
  console.log(require('fs').readdirSync(process.cwd()));
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: false
      }}))
      const config = new DocumentBuilder()
  .setTitle('Ranking')
  .setDescription('Esta API recoge un nombre y una puntuación y la añade a nuestra base de datos. También puedes mirar el ranking de mayor a menor puntuación')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/v1/docs', app, document);
await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
