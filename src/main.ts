import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useStaticAssets(
    process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '..', '..', 'uploads')
      : path.join(__dirname, '..', 'uploads'),
    {
      prefix: '/uploads',
    },
  );
  app.useStaticAssets(
    process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '..', '..', 'public')
      : path.join(__dirname, '..', 'public'),
    {
      prefix: '/dist',
    },
  );

  const config = new DocumentBuilder()
    .setTitle('Slack Clone Study')
    .setDescription('docs for Slack clone study')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  console.log(`listening PORT : ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
