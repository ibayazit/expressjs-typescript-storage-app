import mongoose from 'mongoose';
import Config from '../config/database.config';

export default async function () {
    return await mongoose.connect(Config.database_uri as string)
        .then(() => console.log('Connected to the database'))
}