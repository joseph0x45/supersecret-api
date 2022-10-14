"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils");
function login(payload) {
}
function register(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, secret } = payload;
        let _hashedPassword = yield (0, utils_1.hashPassword)(password);
        const newUser = new User_1.default({ email, password: utils_1.hashPassword, secret });
        newUser.save((err, result) => {
            if (err) {
                return [false, err.message];
            }
            return [true, result];
        });
    });
}
