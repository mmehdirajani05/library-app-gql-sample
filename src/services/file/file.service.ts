import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class FileService {

  AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    const uploadResult = await s3
      .upload({
        Bucket: this.AWS_S3_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${Date.now().toString()}-${filename}`,
      })
      .promise();
    return uploadResult.Location;
  }
}
