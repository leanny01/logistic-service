import * as HttpStatus from "http-status-codes";
import { NextFunction, Response } from "express";
import HttpError from "@/config/error";
import { RequestWithUser } from "@/config/server";
const fs = require("fs").promises;

import { extname } from "path";
const mime = require("mime-types");
const UPLOADFOLDER = "upload";

const fileMoveAsync = async (file: any) =>
  new Promise((resolve, reject) => {
      const fileName =
      new Date().getTime().toString(36) +
      "_" +
      file.name.replace(/[^a-zA-Z0-9._]/g, "");
      const uploadPath = `${UPLOADFOLDER}\\${fileName}`;
      return file.mv(uploadPath, (err: any) => {
          if (err) {
            console.error(err);

            return reject({
              success: false,
              message: "Something went wrong. Please upload again!",
              data: file.name,
          });
        }

          return resolve({
            success: true,
            message: "File Uploaded Successfully!",
            data: fileName,
        });
      });
  });
const uploadFunc = async (file: any) => {
    if (Array.isArray(file)) {
        try {
          const data = await Promise.all(file.map((x) => fileMoveAsync(x)));
          return Promise.resolve({
            success: true,
            message: "Files Uploaded Successfully!",
            data,
        });
      } catch (e) {
          return Promise.reject({
            success: false,
            message: "Something went wrong. Please upload again!",
            data: null,
        });
      }
    }
    if (typeof file === "object") {
        return fileMoveAsync(file);
    }
};
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */

export async function upload(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
          throw new Error("No File Found");
      }
        const result = await uploadFunc(req.files.files);

        res.status(HttpStatus.OK).json(result);
    } catch (error) {
        if (error.code === 500) {
          return next(new HttpError(error.message.status, error.message));
      }
        return next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function read(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> {
    try {
        const filePath = `${UPLOADFOLDER}\\${req.params.name}`;
        const ext = extname(req.params.name);
        const base64 = await fs.readFile(filePath, { encoding: "base64" });

        if (base64 && mime.lookup(ext)) {
          const prefix = "data:" + mime.lookup(ext) + ";base64,";
          const dataUri = prefix + base64;

          res.status(200).json(dataUri);
      } else {
          throw new Error("No File Found");
      }
    } catch (error) {
        console.log(error);
        if (error.code === 500) {
          return next(new HttpError(error.message.status, error.message));
      }
        return next(new HttpError(error.message.status, error.message));
    }
}
