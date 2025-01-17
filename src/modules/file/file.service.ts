import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { API_ERROR_CODES } from 'src/constants/error-codes';
import { CreateException } from 'src/exceptions/exception';
import { FileRepository } from 'src/repositories/file.repository';
import { S3Service } from '../s3/s3.service';


@Injectable()
export class FileService {
  @InjectRepository(FileRepository)
  private fileRepository: FileRepository;

  @Inject(S3Service)
  private s3Service: S3Service;

  async getSignedUrl(fileId: string): Promise<string> {
    const file = await this.fileRepository.findOne({ where: { id: fileId }, select: ['id', 'key'] });
    if (!file) throw new CreateException(API_ERROR_CODES.FILE_NOT_FOUND);
    return this.s3Service.getSignedUrl(file.key);
  }
}
