

// upload.controller.ts
import { BadRequestException, Body, Controller, FileTypeValidator, InternalServerErrorException, Param, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { extname } from 'path';
import * as path from 'path';





const pngFileFilter = (req, file, callback) => {
    let ext = path.extname(file.originalname);

    if (ext !== '.png') {
        req.fileValidationError = 'Invalid file type';
        return callback(new Error('Invalid file type'), false);
    }

    return callback(null, true);
};



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


    @Post('upload-single-file')
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: 'assets/uploads',
                filename: (req, file, cb) => {
                    cb(null, Date.now().toFixed() + extname(file.originalname).toLowerCase());
                },
            }),
        }),
    )
    uploadFile(@UploadedFile(new ParseFilePipe({
        validators: [
            //new MaxFileSizeValidator({ maxSize: 10000 }),
            new FileTypeValidator({
                fileType: '.(png|jpeg|jpg)'

            }),
        ]
    })) image: Express.Multer.File) {
        const path = image.path;

        return {
            statusCode: 200,
            data: path,
        };
    }


    @Post('upload-multiple-files')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: diskStorage({
                destination: 'assets/uploads',
                filename: (req, file, cb) => {
                    cb(null, Date.now().toFixed() + '-' + file.originalname);
                },
            }),
        }),
    )
    uploadFiles(@UploadedFiles(new ParseFilePipe({
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



    @Post("dynamic-upload-multiple-files")
    @UseInterceptors(FilesInterceptor('files'))
    async uploadDFiles(@UploadedFiles() files: any, @Body() body: any) {
        const { path } = body;
        if (!files || files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }
        const filePromises = files.map(async (file: any) => {

            this.validateFileExtension(file);
            const savedFile = await this.uploadService.saveFile(file, path);

            if (savedFile) return savedFile;
        });
        const results = await Promise.all(filePromises);

        if (!results) {
            throw new InternalServerErrorException('Whoops something wentwrong');
        }

        return results
    }


    // @Post("dynamic-upload-multiple-files/:path?")
    // @UseInterceptors(FilesInterceptor('files'))
    // async uploadDFiles(@UploadedFiles() files) {
    //     console.log(files);
    //     // console.log(param);

    //     return 'Done';
    // }
}
