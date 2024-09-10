/**
 * @export
 * @interface ITokenRequest
 */
export interface ITokenRequest {
    username: string;
    password: string;
}
/**
 * @export
 * @interface ITokenResponse
 */
export interface ITokenResponse {
    accessToken: string;
    expiresIn: number;
    userData: any;
}
