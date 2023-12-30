// upload.controller.ts
import { BadRequestException, Controller, FileTypeValidator, InternalServerErrorException, Param, ParseFilePipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { extname } from 'path';

@Controller()
export class UploadController {

    constructor(private uploadService: UploadService) { }


    allowedFileExtensions = ['.png', '.jpeg', '.jpg'];

    validateFileExtension(file: Express.Multer.File) {
        const valid = this.allowedFileExtensions.some(ext => ext === extname(file.originalname).toLowerCase());
        if (!valid) {
            throw new BadRequestException(`Invalid file extension. Allowed extensions: ${this.allowedFileExtensions.join(', ')}`);
        }
    }

    @Post('upload')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: diskStorage({
                destination: 'uploads',
                filename: (req, file, cb) => {
                    cb(null, Date.now().toFixed() + '-' + file.originalname);
                },
            }),
        }),
    )
    uploadFile(@UploadedFiles(new ParseFilePipe({
        validators: [
            //new MaxFileSizeValidator({ maxSize: 10000 }),
            new FileTypeValidator({
                fileType: '.(png|jpeg|jpg)'

            }),
        ]
    })) images: Array<Express.Multer.File>) {
        const pathsArray = images.map(imageFile => imageFile.path);

        return {
            statusCode: 200,
            data: pathsArray,
        };
    }



    @Post("upload/dynamic/:path?")
    @UseInterceptors(FilesInterceptor('files'))
    async uploadDFiles(@UploadedFiles() files: any, @Param() param: any) {
        const { path } = param;
        if (!files || files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }

        const filePromises = files.map(async (file: any) => {

            this.validateFileExtension(file);

            const uoloadPath = path ? path : undefined
            const savedFile = await this.uploadService.saveFile(file, uoloadPath);

            if (savedFile) return savedFile;
        });
        const results = await Promise.all(filePromises);

        if (!results) {
            throw new InternalServerErrorException('Whoops something wentwrong');
        }

        return {
            statusCode: 200,
            data: results,
        };
    }
}