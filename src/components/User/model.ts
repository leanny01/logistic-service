import * as connections from "@/config/connection/connection";
import { Document, Schema } from "mongoose";
import { NextFunction } from "express";

/**
 * @export
 * @interface IUserRequest
 */
export interface IUserRequest {
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    whatsapp_phone: string;
    role: string;
    status: string;
    company: string;
    position: string;
}

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    whatsapp_phone: string;
    role: string;
    status: string;
    company: string;
    position: string;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
*        -name
*        -surname
*        -email
*        -phone
*        -password
*        -whatsapp_phone
*        -role
*        -status
*        -company
*        -position

 *      properties:
*        name:
*          type: String
*        surname:
*          type: String
*        email:
*          type: String
*        phone:
*          type: String
*        password:
*          type: String
*        whatsapp_phone:
*          type: String
*        role:
*          type: String
*        status:
*          type: String
*        company:
*          type: String
*        position:
*          type: String

 *    User:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const UserSchema: Schema = new Schema(
  {
    name: String,
    surname: String,
    email: String,
    phone: String,
    password: String,
    whatsapp_phone: String,
    role: String,
    status: String,
    company: String,
    position: String,
  },
  {
    strict: false,
    collection: "user",
    versionKey: false,
    timestamps: true,
  }
).pre("save", async  (next: NextFunction): Promise<void> => {
  // const user: any = this; // tslint:disable-line
  // do any customization of request on user here like encrypting password before saving
});

export default connections.db.model<IUserModel>("UserModel", UserSchema);
