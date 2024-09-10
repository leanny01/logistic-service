import * as mongoose from "mongoose";
import config from "@/config/env/index";
import Logger from "@/utils/Logger";

interface IConnectOptions {
    connectTimeoutMS: number;
    autoIndex: boolean;
    loggerLevel?: string;
    useNewUrlParser?: boolean;
    useUnifiedTopology: boolean;
    socketTimeoutMS: number;
    family: number;
}

const connectOptions: IConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true, // Automatically build indexes
    connectTimeoutMS: 10000, // Connection timeout in milliseconds
    socketTimeoutMS: 45000, // Socket timeout in milliseconds
    family: 4, // Use IPv4, skip trying IPv6
};

const MONGO_URI: string = `${config.database.MONGODB_URI}`;

export const db: mongoose.Connection = mongoose.createConnection(
  MONGO_URI,
  connectOptions
);

// handlers
db.on("connecting", () => {
    Logger.info("[MongoDB] connecting");
});

db.on("error", (error: any) => {
    Logger.error(`[MongoDB] connection ${error}`);
    mongoose.disconnect();
});

db.on("connected", () => {
    Logger.info("[MongoDB] connected");
});

db.once("open", () => {
    Logger.info("[MongoDB] connection opened");
});

db.on("reconnected", () => {
    Logger.warn("[MongoDB] reconnected");
});

db.on("reconnectFailed", () => {
    Logger.error("[MongoDB] reconnectFailed");
});

db.on("disconnected", () => {
    Logger.warn("[MongoDB] disconnected");
});

db.on("fullsetup", () => {
    Logger.debug("[MongoDB] reconnecting... %d");
});
