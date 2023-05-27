import { Sequelize, Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";

export interface ITransaction {
  txRef: string;
  transactionId: string;
}

export class Transaction extends Model<ITransaction> {
  declare txRef: string;
  declare transactionId: string;
}

Transaction.init(
  {
    txRef: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connectDB(), 
    tableName: "transaction",
  }
);


Transaction.sync();