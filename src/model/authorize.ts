import { Sequelize, Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";
import { v4 as uuidv4 } from "uuid";

export interface Pin_pay {
checkCharge: object;

}

export class Reference_Flw extends Model<Pin_pay> {
  declare checkCharge: object;
}

Reference_Flw.init(
  {
    checkCharge: {
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
    sequelize: connectDB(),
    tableName: "Flutterwave_Reference",
  }
);

Reference_Flw.sync();
