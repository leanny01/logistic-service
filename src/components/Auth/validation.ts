import * as Joi from "joi";
import Validation from "@/components/validation";
import { ITokenRequest } from "./model";

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {
  /**
   * Creates an instance of AuthValidation.
   * @memberof AuthValidation
   */
    constructor() {
        super();
    }

  /**
   * @param {ITokenRequest} params
   * @returns {Joi.ValidationResult<ITokenRequest>}
   * @memberof TokenValidation
   */
    validateTokenInput(
    params: ITokenRequest
  ): Joi.ValidationResult<ITokenRequest> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
          password: Joi.string().required(),
          username: Joi.string().required(),
      });

        return schema.validate(params);
    }
}

export default new AuthValidation();
