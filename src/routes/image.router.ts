import { Router } from 'express';
import responder from '../utils/responder';
import ImageController from '../modules/controllers/image.controller';

export const imageRoute = Router();
const imageController = new ImageController();

imageRoute.route('/')
    .get(responder(imageController.getImages.bind(imageController)))
    .post(responder(imageController.createImage.bind(imageController)));

imageRoute.route('/:id')
    .get(responder(imageController.getImage.bind(imageController)))
    .patch(responder(imageController.updateImage.bind(imageController)))
    .delete(responder(imageController.deleteImage.bind(imageController)));
