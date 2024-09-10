import * as Joi from "joi";
import Validation from "@/components/validation";
import { ILeadModel } from "./model";
import { ISearchParamRequest } from "@/utils/SearchHelper";
/**
 * @export
 * @class LeadValidation
 * @extends Validation
 */
class LeadValidation extends Validation {
  /**
   * Creates an instance of LeadValidation.
   * @memberof LeadValidation
   */
    constructor() {
        super();
    }

  /**
   * @param {ILeadModel} params
   * @returns {Joi.ValidationResult<ILeadModel >}
   * @memberof LeadValidation
   */
    createLead(params: ILeadModel): Joi.ValidationResult<ILeadModel> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
          total_bedroom: Joi.number(),
          move_date: Joi.string(),
          is_qualified: Joi.boolean().allow(null),
          is_deleted: Joi.boolean(),
          category: Joi.number(),
          contact_info: Joi.object(),
          moving_from: Joi.object(),
          moving_to: Joi.object(),
          sent_to: Joi.array(),
          created_by: Joi.string(),
      });

        return schema.validate(params);
    }

  /**
   * @param {{ id: string }} body
   * @param {ILeadModel} params
   * @returns {Joi.ValidationResult<ILeadModel >}
   * @memberof LeadValidation
   */
    updateLead(params: ILeadModel): Joi.ValidationResult<ILeadModel> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
          total_bedroom: Joi.number(),
          move_date: Joi.string(),
          is_qualified: Joi.boolean().allow(null),
          is_deleted: Joi.boolean(),
          category: Joi.number(),
          contact_info: Joi.object(),
          moving_from: Joi.object(),
          moving_to: Joi.object(),
          sent_to: Joi.array(),
          created_by: Joi.string(),
          createdAt: Joi.date(),
          updatedAt: Joi.date(),
      });

        return schema.validate(params);
    }

  /**
   * @param {ISearchParamRequest} params
   * @returns {Joi.ValidationResult<ISearchParamRequest >}
   * @memberof LeadValidation
   */
    searchParams(
    params: ISearchParamRequest
  ): Joi.ValidationResult<ISearchParamRequest> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
          orAnd: Joi.string().required(),
          params: Joi.array().required(),
      });

        return schema.validate(params);
    }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof LeadValidation
   */
    getLead(body: { id: string }): Joi.ValidationResult<{
        id: string;
    }> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
          id: this.customJoi.objectId().required(),
      });

        return schema.validate(body);
    }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof LeadValidation
   */
    removeLead(body: { id: string }): Joi.ValidationResult<{
        id: string;
    }> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
          id: this.customJoi.objectId().required(),
      });

        return schema.validate(body);
    }
}

export default new LeadValidation();
