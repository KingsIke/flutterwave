import { Sequelize, Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";

export interface Tokonization {
  otpValidation: object;
  
}

export class CardToken extends Model<Tokonization> {
  declare  otpValidation: object
}

CardToken.init(
  {
    otpValidation: {
        type: DataTypes.JSON,
        allowNull: false,
    },
   
  },
  {
    sequelize: connectDB(), 
    tableName: "Data_Token",
  }
);


CardToken.sync();