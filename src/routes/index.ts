import * as express from "express";
import * as http from "http";
import * as jwtConfig from "@/config/middleware/jwtAuth";
import * as swaggerUi from "swagger-ui-express";
import AuthRouter from "./AuthRouter";
import * as swaggerJsdoc from "swagger-jsdoc";
import FileRouter from "./FileRouter";
import fileUpload = require("express-fileupload");
import UserRouter from "./UserRouter";
import LeadRouter from "./LeadRouter";

type NextFunction = express.NextFunction;
type Request = express.Request;
type Response = express.Response;

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    app.use(fileUpload());
    app.use("/v1/user", jwtConfig.isAuthenticated, UserRouter);
    app.use("/v1/lead", jwtConfig.isAuthenticated, LeadRouter);

    app.use("/v1/file", jwtConfig.isAuthenticated, FileRouter);
  /**
   * @description Forwards any requests to the /auth URI to our AuthRouter
   * @constructs
   */
    app.use("/auth", AuthRouter);

    const options = {
        definition: {
          openapi: "3.0.0",
          info: {
            title: "logistic_service API",
            version: "1.0.0",
            description: "TypeScript, Express, JWT Auth, Mongoose",
            license: {
              name: "Logistic Service",
              url: null,
          },
        },
          servers: [
            {
                url: "http://localhost:8484",
            },
        ],
      },
        apis: ["./**/*.ts"],
    };
    const specs = swaggerJsdoc(options);

    app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );

  /**
   * @description No results returned mean the object is not found
   * @constructs
   */
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

  /**
   * @constructs all routes
   */
    app.use(router);
}
