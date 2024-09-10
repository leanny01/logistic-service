import * as connections from "@/config/connection/connection";
import { Document, Schema } from "mongoose";

export interface Contact_Info {
  name: string;
  surname: string;
  title: string;
  email: string;
  whatsapp_phone: string;
  phone: string;
}
export interface Moving_From {
  address: string;
  suburb: string;
  city: string;
  postal_code: string;
}
export interface Moving_To {
  address: string;
  suburb: string;
  city: string;
  postal_code: string;
}

/**
 * @export
 * @interface ILeadRequest
 */
export interface ILeadRequest {
  total_bedroom: number;
  move_date: Date;
  is_qualified: boolean | null;
  is_deleted: boolean;
  category: number;
  contact_info: Contact_Info;
  moving_from: Moving_From;
  moving_to: Moving_To;
  sent_to?: string[];
  created_by: string;
}

/**
 * @export
 * @interface ILeadModel
 * @extends {Document}
 */
export interface ILeadModel extends Document {
  total_bedroom: number;
  move_date: Date;
  is_qualified: boolean | null;
  is_deleted: boolean;
  category: number;
  contact_info: Contact_Info;
  moving_from: Moving_From;
  moving_to: Moving_To;
  sent_to?: string[];
  created_by: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ContactInfoSchema = new Schema({
  name: { type: String },
  surname: { type: String },
  title: { type: String },
  email: { type: String },
  whatsapp_phone: { type: String },
  phone: { type: String },
});

const AddressSchema = new Schema({
  address: { type: String },
  suburb: { type: String },
  city: { type: String },
  postal_code: { type: String },
});

/**
 * @swagger
 * components:
 *  schemas:
 *    LeadSchema:
 *      required:
*        -total_bedroom
*        -move_date
*        -is_deleted
*        -created_by
 *      properties:
*        total_bedroom:
*          type: Number
*        move_date:
*          type: Date
*        is_qualified:
*          type: Boolean
*        is_deleted:
*          type: Boolean
*        category:
*          type: String
*        created_by:
*          type: string[]

 *    Lead:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/LeadSchema'
 */
const LeadSchema: Schema = new Schema(
  {
    total_bedroom: {
      type: Number,
    },
    move_date: { type: Date },
    is_qualified: {
      type: Boolean,
      default: null,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    category: { type: Number },
    contact_info: {
      type: ContactInfoSchema,
    },
    moving_from: {
      type: AddressSchema,
    },
    moving_to: {
      type: AddressSchema,
    },
    sent_to: { type: [String] },
    created_by: {
      type: String,
    },
  },
  {
    strict: false,
    collection: "lead",
    timestamps: true,
  },

);



export default connections.db.model<ILeadModel>("LeadModel", LeadSchema);
