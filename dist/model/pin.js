"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetails = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class UserDetails extends sequelize_1.Model {
}
exports.UserDetails = UserDetails;
UserDetails.init({
    payload: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    }
}, {
    sequelize: (0, db_1.connectDB)(),
    tableName: "User_Detail",
});
UserDetails.sync();
