"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Transaction extends sequelize_1.Model {
}
exports.Transaction = Transaction;
Transaction.init({
    txRef: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    transactionId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: (0, db_1.connectDB)(),
    tableName: "transaction",
});
Transaction.sync();
