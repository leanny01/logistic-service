import * as dotenv from "dotenv";

dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        MONGODB_URI: string;
        MONGODB_DB_MAIN: string;
    };
    secret: string;
    TOKEN_EXPIRE_TIME_MSEC: number;
}

const NODE_ENV: string = process.env.NODE_ENV || "development";

const development: IConfig = {
    port: process.env.PORT || 8484,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/",
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || "example_db",
    },
    secret: process.env.SECRET || "secret",
    TOKEN_EXPIRE_TIME_MSEC: parseInt(process.env.TOKEN_EXPIRE_TIME_MSEC) || 48000,
};
const production: IConfig = {
    port: process.env.PORT || 8484,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || "mongodb://production_uri/",
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || "example_db",
    },
    secret: process.env.SECRET || "secret",
    TOKEN_EXPIRE_TIME_MSEC: parseInt(process.env.TOKEN_EXPIRE_TIME_MSEC) || 48000,
};

const test: IConfig = {
    port: process.env.PORT || 8484,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
        MONGODB_DB_MAIN: `${process.env.MONGODB_DB_MAIN || "example_db"}_test`,
    },
    secret: process.env.SECRET || "secret",
    TOKEN_EXPIRE_TIME_MSEC: parseInt(process.env.TOKEN_EXPIRE_TIME_MSEC) || 48000,
};

const config: {
    [name: string]: IConfig;
} = {
    test,
    development,
    production,
};

export default config[NODE_ENV];
