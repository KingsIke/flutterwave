"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.db = void 0;
const sequelize_1 = require("sequelize");
exports.db = new sequelize_1.Sequelize("postgres", "postgres", "453622", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
});
function connectDB() {
    try {
        exports.db.authenticate();
        exports.db.sync();
        // db.drop() 
        console.log("Connection has been established successfully.");
        return exports.db;
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
}
exports.connectDB = connectDB;
