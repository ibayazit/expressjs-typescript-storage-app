import dotenv from 'dotenv';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import rateLimitter from './config/rate-limitter.config';
import mongooseConnect from './database/mongo.database';
import { createStorageFolder } from './utils/file-manager';
import { notFound } from './middlewares/not-found.middleware';
import { welcomeRoute } from './routes/welcome.router';
import { imageRoute } from './routes/image.router';

dotenv.config();
mongooseConnect();
createStorageFolder('storage');

export const app: Express = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(rateLimitter)

app.use('/', welcomeRoute);
app.use('/v1/image', imageRoute);

app.use(notFound);