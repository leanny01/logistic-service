import * as HttpStatus from "http-status-codes";
import * as jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import app from "@/config/server/server";
import HttpError from "@/config/error";
import * as http from "http";
import { RequestWithUser } from "../server";

/**
 *
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export function isAuthenticated(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void {
    const token: any = req.headers.authorization;

    if (token && token.indexOf("Bearer ") !== -1) {
      try {
        const user: object | string = jwt.verify(
        token.split("Bearer ")[1],
        app.get("secret")
      );

        if (user) {
          req.user = user;

          return next();
      }
        next(new HttpError(HttpStatus.BAD_REQUEST, "Invalid token provided"));
    } catch (error) {
        return next(
        new HttpError(
          HttpStatus.UNAUTHORIZED,
          http.STATUS_CODES[HttpStatus.UNAUTHORIZED]
        )
      );
    }
  }

    return next(new HttpError(HttpStatus.BAD_REQUEST, "No token provided"));
}
