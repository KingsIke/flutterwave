import { Sequelize, Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";

export interface Tokonization {
  response: object;
  
}

export class CardDetails extends Model<Tokonization> {
  declare  response: object
}

CardDetails.init(
  {
    response: {
        type: DataTypes.JSON,
        allowNull: false,
    },
   
  },
  {
    sequelize: connectDB(), 
    tableName:  "Token_Ref",
  }
);


CardDetails.sync();