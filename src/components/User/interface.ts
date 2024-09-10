import { ISearchParamRequest } from "@/utils/SearchHelper";
import { IUserModel } from "./model";

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {
  /**
   * @returns {Promise <number>}
   * @memberof UserService
   */
    countAll(): Promise<number>;

  /**
   * @returns {Promise <number>}
   * @memberof UserService
   */
    countSearch(body: ISearchParamRequest): Promise<number>;

  /**
   * @returns {Promise<IUserModel[]>}
   * @memberof IUserService
   */
    findAll(pageNo: number, pageSize: number): Promise<IUserModel[]>;

  /**
   * @param {ISearchParamRequest} param
   * @returns {Promise<IUserModel[]>}
   * @memberof IUserService
   */
    search(
    searchParam: ISearchParamRequest,
    pageNo: number,
    pageSize: number
  ): Promise<IUserModel[]>;

  /**
   * @param {string} code
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
    findOne(code: string): Promise<IUserModel>;

  /**
   * @param {IUserModel} IUserModel
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
    insert(IUserModel: IUserModel): Promise<IUserModel>;

  /**
   * @param {string} id
   * @param {IUserModel} IUserModel
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
    update(id: string, IUserModel: IUserModel): Promise<number>;

  /**
   * @param {string} id
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
    remove(id: string): Promise<IUserModel>;
}
