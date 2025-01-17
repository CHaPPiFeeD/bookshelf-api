import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities/file.entity';
import { FileRepository } from 'src/repositories/file.repository';
import { S3Service } from '../s3/s3.service';


@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [FileController],
  providers: [FileService, FileRepository, S3Service],
  exports: [FileService],
})
export class FileModule {}
