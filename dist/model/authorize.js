"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reference_Flw = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Reference_Flw extends sequelize_1.Model {
}
exports.Reference_Flw = Reference_Flw;
Reference_Flw.init({
    checkCharge: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    }
}, {
    sequelize: (0, db_1.connectDB)(),
    tableName: "Flutterwave_Reference",
});
Reference_Flw.sync();
