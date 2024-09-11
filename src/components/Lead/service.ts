import * as Joi from "joi";
import LeadModel, { ILeadModel } from "./model";
import LeadValidation from "./validation";
import { ILeadService } from "./interface";
import { Types } from "mongoose";
import { GetSearchQuery, ISearchParamRequest } from "@/utils/SearchHelper";

/**
 * @export
 * @implements {ILeadModelService}
 */
const LeadService: ILeadService = {
  /**
   * @returns {Promise <number>}
   * @memberof LeadService
   */
  async countAll(): Promise<number> {
    try {
      return await LeadModel.countDocuments({});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @returns {Promise <number>}
   * @memberof ProductsService
   */
  async countSearch(body: ISearchParamRequest): Promise<number> {
    try {
      const query = GetSearchQuery(body);
      return await LeadModel.countDocuments(query);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  /**
   * @returns {Promise < ILeadModel[] >}
   * @memberof LeadService
   */
  async findAll(pageNo: number, pageSize: number): Promise<ILeadModel[]> {
    try {
      const skip = pageNo * pageSize;
      return await LeadModel.find({}).skip(skip).limit(pageSize);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {ISearchParamRequest} searchParam
   * @returns {Promise <ILeadModel[]>}
   * @memberof LeadService
   */
  async search(
    body: ISearchParamRequest,
    pageNo: number,
    pageSize: number
  ): Promise<ILeadModel[]> {
    try {
      const validate: Joi.ValidationResult<ISearchParamRequest> =
        LeadValidation.searchParams(body);
      if (validate.error) {
        throw new Error(validate.error.message);
      }
      const skip = pageNo * pageSize;
      const query = GetSearchQuery(body);
      return await LeadModel.find(query).skip(skip).limit(pageSize);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < ILeadModel >}
   * @memberof LeadService
   */
  async findOne(id: string): Promise<ILeadModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = LeadValidation.getLead({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await LeadModel.findOne({
        _id: new Types.ObjectId(id),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {ILeadModel} lead
   * @returns {Promise < ILeadModel >}
   * @memberof LeadService
   */
  async insert(body: ILeadModel): Promise<ILeadModel> {
    try {
      const validate: Joi.ValidationResult<ILeadModel> =
        LeadValidation.createLead(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const lead: ILeadModel = await LeadModel.create(body);

      return lead;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @param {ILeadModel} lead
   * @returns {Promise < ILeadModel >}
   * @memberof LeadService
   */
  async update(id: string, body: ILeadModel): Promise<number> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Id");
      }

      const validate: Joi.ValidationResult<ILeadModel> =
        LeadValidation.updateLead(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const lead = await LeadModel.updateOne(
        { _id: new Types.ObjectId(id) },
        { $set: body }
      );

      return lead.modifiedCount;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < ILeadModel >}
   * @memberof LeadService
   */
  async remove(id: string): Promise<ILeadModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = LeadValidation.removeLead({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const lead: ILeadModel = await LeadModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
      });

      return lead;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default LeadService;
