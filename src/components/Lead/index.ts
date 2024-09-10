import LeadService from "./service";
import { HttpError } from "@/config/error";
import { ILeadModel } from "./model";
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
        const lead: ILeadModel[] = await LeadService.findAll(pageNo, pageSize);
        const totalCount = await LeadService.countAll();

        res.status(200).json({
          totalCount,
          records: lead,
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
        const lead: ILeadModel[] = await LeadService.search(
      req.body,
      pageNo,
      pageSize
    );
        const totalCount = await LeadService.countSearch(req.body);

        res.status(201).json({
          totalCount,
          records: lead,
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
        const lead: ILeadModel = await LeadService.findOne(req.params.id);

        res.status(200).json(lead);
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
        const lead: ILeadModel = await LeadService.insert(req.body);

        res.status(201).json(lead);
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
        const lead = await LeadService.update(req.params.id, req.body);

        if (lead.valueOf() > 0) {
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
        const lead: ILeadModel = await LeadService.remove(req.params.id);

        res.status(200).json(lead);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
