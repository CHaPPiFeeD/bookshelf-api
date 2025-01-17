import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FileService } from './file.service';
import { Public } from 'nest-keycloak-connect';


@Controller('/api/files')
export class FileController {
  @Inject(FileService)
  private fileService: FileService;
  

  @Public()
  @Get('/:file_id/url')
  getSignedUrl(
    @Param('file_id') fileId: string,
  ): Promise<string> {
    return this.fileService.getSignedUrl(fileId);
  }
}
