import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1')

  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('assenssment')
  .setDescription('Documentation for the Assensment')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
