import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities/file.entity';
import { Repository } from 'typeorm';


@Injectable()
export class FileRepository extends Repository<FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>
  ) {
    super(fileRepository.target, fileRepository.manager, fileRepository.queryRunner);
  }
}
