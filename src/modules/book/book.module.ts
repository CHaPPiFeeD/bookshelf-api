import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from '../../entities/book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Chapter } from '../../entities/chapter.entity';
import { BookRepository } from '../../repositories/book.repository';
import { CheckAccessTokenMiddleware } from '../../middlewares/check-access-token.middleware';
import { JwtModule } from '../jwt/jwt.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Chapter]),
    JwtModule,
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckAccessTokenMiddleware).forRoutes('/api/books');
  }
}
