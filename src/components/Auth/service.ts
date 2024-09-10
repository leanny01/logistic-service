import * as Joi from "joi";
import AuthValidation from "./validation";
import { IAuthService } from "./interface";
import { ITokenRequest } from "./model";

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {
  /**
   * @param {ITokenRequest} body
   * @returns {Promise <any>}
   * @memberof AuthService
   */
    async generateToken(body: ITokenRequest): Promise<any> {
        try {
          const validate: Joi.ValidationResult<ITokenRequest> =
        AuthValidation.validateTokenInput(body);

          if (validate.error) {
            throw new Error(validate.error.message);
        }

      // Fetch from collection based on username password
          const user = { id: 1, username: "admin", password: "admin123" };

          if (body.password === user.password && body.username === user.username) {
            return user;
        }

          throw new Error("Invalid password or username");
      } catch (error) {
          throw new Error(error);
      }
    },
};

export default AuthService;
