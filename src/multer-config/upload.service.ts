// upload.service.ts

import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { imageSize } from 'image-size';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {

  async saveFile(file: any, dir?: string): Promise<any> {

    const uploadDir = dir ? './assets/uploads/' + dir : './assets/uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const dimensions = imageSize(file.buffer);

    const fileName = this.generateUniqueFileName(file.originalname);
    const filePath = path.join(uploadDir, fileName);

    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(filePath);

      stream.on('finish', () => resolve({ url: filePath, width: dimensions.width, height: dimensions.height }));
      stream.on('error', (error) => {
        fs.unlinkSync(filePath);
        reject(new BadRequestException('Failed to save file'));
      });

      stream.end(file.buffer);
    });
  }

  private generateUniqueFileName(originalName: string): string {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(7);

    const ext = path.extname(originalName);
    const fileName = `${timestamp}_${randomString}${ext}`;

    return fileName;
  }
}