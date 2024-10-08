import * as http from "http";
import * as serverHandlers from "./serverHandlers";
import server from "./server";
import { Request } from "express";

export interface RequestWithUser extends Request {
    user: any;
    query: any;
    body: any;
    params: any;
    headers: any;
    files: any;
}
const Server: http.Server = http.createServer(server);

/**
 * Binds and listens for connections on the specified host
 */
Server.listen(server.get("port"));

/**
 * Server Events
 */
Server.on("error", (error: Error) =>
  serverHandlers.onError(error, server.get("port"))
);
Server.on("listening", serverHandlers.onListening.bind(Server));
