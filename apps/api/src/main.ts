import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (process.env.SWAGGER_ENABLED === 'true') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Personal Portfolio API')
      .setDescription('Content for the portfolio site')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    const swaggerUiCdn = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.34.1';
    SwaggerModule.setup('docs', app, document, {
      customCssUrl: `${swaggerUiCdn}/swagger-ui.css`,
      customJs: [
        `${swaggerUiCdn}/swagger-ui-bundle.js`,
        `${swaggerUiCdn}/swagger-ui-standalone-preset.js`,
      ],
      customfavIcon: `${swaggerUiCdn}/favicon-32x32.png`,
      swaggerOptions: { persistAuthorization: true },
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
