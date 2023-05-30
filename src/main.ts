import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ResponseInterception } from './interceptors';
import { HttpExceptionFilter } from './exceptions';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterception());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(configService.get('port'));
}
bootstrap();
