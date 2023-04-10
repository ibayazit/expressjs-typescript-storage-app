import { Request, Response, NextFunction } from "express";
import formidable from 'formidable';
import fs from 'fs'
import { Types } from "mongoose";
import ImageService from '../services/image.service';
import { ImageInterface } from '../../database/models/image.model';
import { ImageCreateDto } from "../dtos/image-create.dto";
import { unlinkStorageFile } from '../../utils/file-manager';

export default class ImageController {
    private imageService = new ImageService();
    private form = new formidable.IncomingForm({
        multiples: false,
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024,
        uploadDir: __dirname + '/../../storage',
        filter: ({ name, originalFilename, mimetype }): boolean => {
            return mimetype && mimetype.includes("image") ? true : false;
        }
    });

    private uploadImage(request: Request): Promise<ImageCreateDto> {
        return new Promise((resolve, reject) => {
            this.form.parse(request, (err, fields, files) => {
                if (err) return reject(err);

                const { newFilename } = files.image as { newFilename: string };

                resolve({ secret: fields.secret as string | null, file: newFilename });
            });
        });
    }

    private unlinkImage(file: string | null | undefined): void {
        unlinkStorageFile('storage/' + file);
        // if (file)
        //     fs.unlink(__dirname + '/../../storage/' + file, () => { })
    }

    async getImages(req: Request, res: Response, next: NextFunction) {
        const images = await this.imageService.getImages();

        return {
            data: images
        }
    }

    async getImage(req: Request, res: Response, next: NextFunction) {
        const id: Types.ObjectId = new Types.ObjectId(req.params.id);
        const { secret } = req.query;
        const image = await this.imageService.getImage(id, secret as string | null);

        return {
            data: image
        }
    }

    async createImage(req: Request, res: Response, next: NextFunction) {
        const body = await this.uploadImage(req);

        const dto = new ImageCreateDto;
        dto.file = body.file;
        dto.secret = body.secret === "" ? null : body.secret;

        const image = await this.imageService.createImage(dto);

        return {
            message: 'Image successfully created.',
            data: image
        }
    }

    async updateImage(req: Request, res: Response, next: NextFunction) {
        const id: Types.ObjectId = new Types.ObjectId(req.params.id);
        const body = await this.uploadImage(req);

        const dto = new ImageCreateDto;
        dto.file = body.file;
        dto.secret = body.secret === "" ? null : body.secret;

        const image: ImageInterface | null = await this.imageService.updateImage(id, dto);

        this.unlinkImage(image?.file);

        return {
            message: 'Image successfully updated.'
        }
    }

    async deleteImage(req: Request, res: Response, next: NextFunction) {
        const id: Types.ObjectId = new Types.ObjectId(req.params.id);
        const image = await this.imageService.deleteImage(id);

        this.unlinkImage(image?.file);

        return {
            message: 'Image successfully deleted.'
        }
    }
}