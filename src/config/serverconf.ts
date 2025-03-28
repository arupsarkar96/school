import * as dotenv from 'dotenv'
dotenv.config()

if (!process.env.MYSQL || !process.env.JWT_SECRET || !process.env.SMS_API_KEY || !process.env.ENV) {
    throw new Error("Missing required environment variables");
}

export enum ENV_TYPE {
    DEV, PROD
}

export interface ServerConfiguration {
    PORT: number,
    MYSQL: string,
    JWT_SECRET: string,
    SMS_API_KEY: string,
    ENV: ENV_TYPE
}

const configuration: ServerConfiguration = {
    PORT: Number(process.env.PORT) || 8080,
    MYSQL: process.env.MYSQL,
    JWT_SECRET: process.env.JWT_SECRET,
    SMS_API_KEY: process.env.SMS_API_KEY,
    ENV: process.env.ENV == "DEV" ? ENV_TYPE.DEV : ENV_TYPE.PROD
}



export default configuration