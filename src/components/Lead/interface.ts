import { ISearchParamRequest } from "@/utils/SearchHelper";
import { ILeadModel } from "./model";

/**
 * @export
 * @interface ILeadService
 */
export interface ILeadService {
  /**
   * @returns {Promise <number>}
   * @memberof LeadService
   */
    countAll(): Promise<number>;

  /**
   * @returns {Promise <number>}
   * @memberof LeadService
   */
    countSearch(body: ISearchParamRequest): Promise<number>;

  /**
   * @returns {Promise<ILeadModel[]>}
   * @memberof ILeadService
   */
    findAll(pageNo: number, pageSize: number): Promise<ILeadModel[]>;

  /**
   * @param {ISearchParamRequest} param
   * @returns {Promise<ILeadModel[]>}
   * @memberof ILeadService
   */
    search(
    searchParam: ISearchParamRequest,
    pageNo: number,
    pageSize: number
  ): Promise<ILeadModel[]>;

  /**
   * @param {string} code
   * @returns {Promise<ILeadModel>}
   * @memberof ILeadService
   */
    findOne(code: string): Promise<ILeadModel>;

  /**
   * @param {ILeadModel} ILeadModel
   * @returns {Promise<ILeadModel>}
   * @memberof ILeadService
   */
    insert(ILeadModel: ILeadModel): Promise<ILeadModel>;

  /**
   * @param {string} id
   * @param {ILeadModel} ILeadModel
   * @returns {Promise<ILeadModel>}
   * @memberof ILeadService
   */
    update(id: string, ILeadModel: ILeadModel): Promise<number>;

  /**
   * @param {string} id
   * @returns {Promise<ILeadModel>}
   * @memberof ILeadService
   */
    remove(id: string): Promise<ILeadModel>;
}
