import { Router} from 'express';
import responder from '../utils/responder';
import WelcomeController from '../modules/controllers/welcome.controller';

export const welcomeRoute = Router();
const welcomeController = new WelcomeController();

welcomeRoute.get('/', responder(welcomeController.helloWorld.bind(welcomeController)));