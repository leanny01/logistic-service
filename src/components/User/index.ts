import UserService from "./service";
import { HttpError } from "@/config/error";
import { IUserModel } from "./model";
import { NextFunction, Response } from "express";
import { RequestWithUser } from "@/config/server";

/**
 * @export
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function findAll(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> {
    try {
        const pageNo = req.query.pageNo
      ? parseInt(req.query.pageNo.toString()) - 1
      : 0;
        const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize.toString())
      : 20;
        const user: IUserModel[] = await UserService.findAll(pageNo, pageSize);
        const totalCount = await UserService.countAll();

        res.status(200).json({
          totalCount,
          records: user,
          pageNo: pageNo + 1,
          pageSize,
      });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function search(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> {
    try {
        const pageNo = req.query.pageNo
      ? parseInt(req.query.pageNo.toString()) - 1
      : 0;
        const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize.toString())
      : 20;
        const user: IUserModel[] = await UserService.search(
      req.body,
      pageNo,
      pageSize
    );
        const totalCount = await UserService.countSearch(req.body);

        res.status(201).json({
          totalCount,
          records: user,
          pageNo,
          pageSize,
      });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
/**
 * @export
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function findOne(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> {
    try {
        const user: IUserModel = await UserService.findOne(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function create(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> {
    try {
        const user: IUserModel = await UserService.insert(req.body);

        res.status(201).json(user);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function update(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> {
    try {
        const user = await UserService.update(req.params.id, req.body);

        if (user.valueOf() > 0) {
          res.status(200).json("Updated successfully");
      } else {
          res.status(400).json("Failed to update");
      }
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function remove(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> {
    try {
        const user: IUserModel = await UserService.remove(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
