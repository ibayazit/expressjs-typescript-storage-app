import { Types } from "mongoose";
import Image, { ImageInterface } from '../../database/models/image.model';
import { ImageCreateDto } from "../dtos/image-create.dto";

export default class ImageService {
    async getImages(): Promise<ImageInterface[]> {
        // Filter images with secret key
        // const images = await Image.find({
        //     secret: {
        //         $eq: null
        //     }
        // });
        const images = await Image.find({});

        return images;
    }

    async getImage(id: Types.ObjectId, secret: string | null): Promise<ImageInterface | null> {
        const image: ImageInterface | null = await Image.findById(id);

        const checkSecret = image && image?.secret ? await image.compareSecret(secret) : true;

        return checkSecret ? image : null;
    }

    async deleteImage(id: Types.ObjectId): Promise<ImageInterface | null> {
        const image = await Image.findByIdAndDelete(id);

        return image;
    }

    async createImage(data: ImageCreateDto): Promise<ImageInterface> {
        const image = await Image.create(data)

        return image;
    }

    async updateImage(id: Types.ObjectId, data: ImageCreateDto): Promise<ImageInterface | null> {
        const image = await Image.findByIdAndUpdate(id, data, {
            new: false,
            runValidators: true
        })

        return image;
    }
}