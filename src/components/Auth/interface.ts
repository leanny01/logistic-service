import { ITokenRequest } from "./model";

/**
 * @export
 * @interaface IAuthService
 */
export interface IAuthService {

    /**
     * @param {ITokenRequest} ITokenRequest
     * @returns {Promise<any>}
     * @memberof AuthService
     */
    generateToken(tokenRequest:ITokenRequest): Promise<any>;
}
