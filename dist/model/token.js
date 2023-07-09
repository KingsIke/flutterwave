"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardToken = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class CardToken extends sequelize_1.Model {
}
exports.CardToken = CardToken;
CardToken.init({
    otpValidation: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
}, {
    sequelize: (0, db_1.connectDB)(),
    tableName: "Data_Token",
});
CardToken.sync();
