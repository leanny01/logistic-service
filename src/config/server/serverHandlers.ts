import Logger from "@/utils/Logger";
import { Address } from "cluster";

/**
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throw error
 */
export function onError(
  error: NodeJS.ErrnoException,
  port: number | string | boolean
): void {
    if (error.syscall !== "listen") {
      throw error;
  }

    const bind: string =
    typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
      case "EACCES":
          Logger.error(`${bind} requires elevated privileges`);
          process.exit(1);

          break;
      case "EADDRINUSE":
          Logger.error(`${bind} is already in use`);
          process.exit(1);

          break;
      default:
          throw error;
  }
}

/**
 * @export onListening
 */
export function onListening(): void {
    const addr: Address = this.address();
    const bind: string =
    typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

    Logger.debug(`Listening on ${bind}`);
}
