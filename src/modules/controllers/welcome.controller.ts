import { Request, Response, NextFunction } from "express";
import WelcomeService from '../services/welcome.service';

export default class WelcomeController {
    private welcomeService = new WelcomeService();

    helloWorld(req: Request, res: Response, next: NextFunction) {
        const response = this.welcomeService.helloWorld();

        return {
            data: {
                name: 'İbrahim',
                surname: 'Bayazit',
                email: 'ibrbayazit@gmail.com',
                github: 'https://github.com/ibayazit'
            },
            message: `"${response}" from WelcomeController`,
            status: 200
        }
    }
}