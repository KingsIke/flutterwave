// // // import sequelize, { DataTypes } from 'sequelize';

// // // const Transaction = sequelize.define('Transaction', {
// // //   txRef: {
// // //     type: DataTypes.STRING,
// // //     allowNull: false,
// // //     unique: true,
// // //   },
// // //   transactionId: {
// // //     type: DataTypes.STRING,
// // //     allowNull: false,
// // //   },
// // // });

// // // // Create the transactions table if it doesn't exist
// // // Transaction.sync();

// // import { Sequelize, Model, DataTypes } from "sequelize";
// // import {connectDB} from '../config/db'

// // export interface ITransaction{
// //     txRef: string;
// //     transactionId: string;
// // }

// // export class transactionIdInstance extends Model<ITransaction>{
// //     declare txRef: string;
// //     declare transactionId: string;
// // }

// // transactionIdInstance.init(
// //     {
// //         txRef: {
// //                 type: DataTypes.STRING,
// //                 allowNull: false,
// //                 unique: true,
// //               },
// //               transactionId: {
// //                 type: DataTypes.STRING,
// //                 allowNull: false,
// //               },
// //     },
// //     {
// //         sequelize: connectDB(),
// //         tableName: "transation",
// //       }

// // )

// import { Sequelize, Model, DataTypes } from "sequelize";
// import { connectDB } from "../config/db";

// export interface ITransaction {
//   txRef: string;
//   transactionId: string;
// }

// export class Transaction extends Model<ITransaction> {
//   public txRef!: string;
//   public transactionId!: string;
// }

// Transaction.init(
//   {
//     txRef: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     transactionId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize: connectDB(), // Invoke the connectDB function to obtain the Sequelize instance
//     tableName: "transaction", // Corrected the table name to "transaction"
//   }
// );


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
    sequelize: connectDB(), // Invoke the connectDB function to obtain the Sequelize instance
    tableName: "transaction", // Corrected the table name to "transaction"
  }
);


Transaction.sync();