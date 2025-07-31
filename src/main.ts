import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
void bootstrap();
