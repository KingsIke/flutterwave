import { Sequelize, Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";

export interface Tokonization {
  data: object;
  
}

export class CardToken extends Model<Tokonization> {
  declare  data: object
}

CardToken.init(
  {
    data: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
   
  },
  {
    sequelize: connectDB(), 
    tableName: "Data_Token",
  }
);


CardToken.sync();