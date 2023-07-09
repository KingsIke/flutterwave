"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardDetails = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class CardDetails extends sequelize_1.Model {
}
exports.CardDetails = CardDetails;
CardDetails.init({
    response: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
}, {
    sequelize: (0, db_1.connectDB)(),
    tableName: "Token_Ref",
});
CardDetails.sync();
