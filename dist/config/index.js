"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connecToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connecToDB() {
    mongoose_1.default.connect(process.env.DB_URL || "mongodb://localhost:27017/ssecret", () => {
        console.log("Connected to database");
    });
}
exports.connecToDB = connecToDB;
