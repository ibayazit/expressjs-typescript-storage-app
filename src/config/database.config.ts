import dotenv from 'dotenv';
dotenv.config();

export default {
    database_uri: process.env.DATABASE_CONNECTION_URI
}