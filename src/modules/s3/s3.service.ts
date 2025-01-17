import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


@Injectable()
export class S3Service {
  private client: S3Client;
  private BUCKET: string = this.configService.get('S3_BUCKET');
  private s3_region: string = this.configService.get('S3_REGION');

  constructor(
    private readonly configService: ConfigService,
  ) {
    if (!this.s3_region) {
      throw new Error('S3_REGION not found in environment variables');
    }

    this.client = new S3Client({
      region: this.s3_region,
      credentials: {
        accessKeyId: this.configService.get('s3.accessKeyID'),
        secretAccessKey: this.configService.get('s3.accessSecret'),
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(
    { key, file, mimeType }:
      { key: string, file: Buffer, mimeType: string }) {
    const params = {
      Bucket: this.BUCKET,
      Key: key,
      Body: file,
      ContentType: mimeType,
    };

    try {
      return await this.client.send(
        new PutObjectCommand(params),
      );
    } catch (e) {
      console.log(e);
    }
  }

  getSignedUrl(key: string): Promise<string> {
    const params = { Bucket: this.BUCKET, Key: key };
    const command = new GetObjectCommand(params);
    return getSignedUrl(this.client, command, { expiresIn: 15 * 60 });
  }

  // getFileUrl(key: string) {
  //   return `https://${this.bucket}.s3.${this.s3_region}.amazonaws.com/${key}`;
  // }
}
