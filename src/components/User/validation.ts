import * as Joi from "joi";
import Validation from "@/components/validation";
import { IUserModel } from "./model";
import { ISearchParamRequest } from "@/utils/SearchHelper";
/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation {
  /**
   * Creates an instance of UserValidation.
   * @memberof UserValidation
   */
    constructor() {
      super();
  }

  /**
   * @param {IUserModel} params
   * @returns {Joi.ValidationResult<IUserModel >}
   * @memberof UserValidation
   */
    createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
      const schema: Joi.ObjectSchema = Joi.object().keys({
        name: Joi.string(),
        surname: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
        password: Joi.string(),
        whatsapp_phone: Joi.string(),
        role: Joi.string(),
        status: Joi.string(),
        company: Joi.string(),
        position: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
    });

      return schema.validate(params);
  }

  /**
   * @param {{ id: string }} body
   * @param {IUserModel} params
   * @returns {Joi.ValidationResult<IUserModel >}
   * @memberof UserValidation
   */
    updateUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
      const schema: Joi.ObjectSchema = Joi.object().keys({
        name: Joi.string(),
        surname: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
        password: Joi.string(),
        whatsapp_phone: Joi.string(),
        role: Joi.string(),
        status: Joi.string(),
        company: Joi.string(),
        position: Joi.string(),
    });

      return schema.validate(params);
  }

  /**
   * @param {ISearchParamRequest} params
   * @returns {Joi.ValidationResult<ISearchParamRequest >}
   * @memberof UserValidation
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
   * @memberof UserValidation
   */
    getUser(body: { id: string }): Joi.ValidationResult<{
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
   * @memberof UserValidation
   */
    removeUser(body: { id: string }): Joi.ValidationResult<{
      id: string;
  }> {
      const schema: Joi.ObjectSchema = Joi.object().keys({
        id: this.customJoi.objectId().required(),
    });

      return schema.validate(body);
  }
}

export default new UserValidation();
