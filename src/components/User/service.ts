import * as Joi from "joi";
import UserModel, { IUserModel } from "./model";
import UserValidation from "./validation";
import { IUserService } from "./interface";
import { Types } from "mongoose";
import { GetSearchQuery, ISearchParamRequest } from "@/utils/SearchHelper";

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
  /**
   * @returns {Promise <number>}
   * @memberof UserService
   */
    async countAll(): Promise<number> {
        try {
          return await UserModel.countDocuments({});
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
          return await UserModel.countDocuments(query);
      } catch (error) {
          throw new Error(error.message);
      }
    },
  /**
   * @returns {Promise < IUserModel[] >}
   * @memberof UserService
   */
    async findAll(pageNo: number, pageSize: number): Promise<IUserModel[]> {
        try {
          const skip = pageNo * pageSize;
          return await UserModel.find({}).skip(skip).limit(pageSize);
      } catch (error) {
          throw new Error(error.message);
      }
    },

  /**
   * @param {ISearchParamRequest} searchParam
   * @returns {Promise <IUserModel[]>}
   * @memberof UserService
   */
    async search(
    body: ISearchParamRequest,
    pageNo: number,
    pageSize: number
  ): Promise<IUserModel[]> {
        try {
          const validate: Joi.ValidationResult<ISearchParamRequest> =
        UserValidation.searchParams(body);
          if (validate.error) {
            throw new Error(validate.error.message);
        }
          const skip = pageNo * pageSize;
          const query = GetSearchQuery(body);
          return await UserModel.find(query).skip(skip).limit(pageSize);
      } catch (error) {
          throw new Error(error.message);
      }
    },

  /**
   * @param {string} id
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
    async findOne(id: string): Promise<IUserModel> {
        try {
          const validate: Joi.ValidationResult<{
            id: string;
        }> = UserValidation.getUser({
          id,
      });

          if (validate.error) {
            throw new Error(validate.error.message);
        }

          return await UserModel.findOne({
            _id: new Types.ObjectId(id),
        });
      } catch (error) {
          throw new Error(error.message);
      }
    },

  /**
   * @param {IUserModel} user
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
    async insert(body: IUserModel): Promise<IUserModel> {
        try {
          const validate: Joi.ValidationResult<IUserModel> =
        UserValidation.createUser(body);

          if (validate.error) {
            throw new Error(validate.error.message);
        }

          const user: IUserModel = await UserModel.create(body);

          return user;
      } catch (error) {
          throw new Error(error.message);
      }
    },

  /**
   * @param {string} id
   * @param {IUserModel} user
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
    async update(id: string, body: IUserModel): Promise<number> {
        try {
          const validate: Joi.ValidationResult<IUserModel> =
        UserValidation.updateUser(body);

          if (validate.error) {
            throw new Error(validate.error.message);
        }

          const user = await UserModel.updateOne(
        { _id: new Types.ObjectId(id) },
        { $set: body }
      );

          return user.modifiedCount;
      } catch (error) {
          throw new Error(error.message);
      }
    },

  /**
   * @param {string} id
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
    async remove(id: string): Promise<IUserModel> {
        try {
          const validate: Joi.ValidationResult<{
            id: string;
        }> = UserValidation.removeUser({
          id,
      });

          if (validate.error) {
            throw new Error(validate.error.message);
        }

          const user: IUserModel = await UserModel.findOneAndDelete({
            _id: new Types.ObjectId(id),
        });

          return user;
      } catch (error) {
          throw new Error(error.message);
      }
    },
};

export default UserService;
