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
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils");
const EncryptionService_1 = require("../services/EncryptionService");
function login(req, res) {
}
exports.login = login;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        //NOTE - Verify if email us already in use
        if (yield (0, utils_1.userExists)(email)) {
            return res.status(409).send({
                "message": "This email is already in use"
            });
        }
        //NOTE - Hash user password
        const hashedPassword = yield (0, utils_1.hashPassword)(password);
        //NOTE - Generate random secret for user
        const secret = yield (0, EncryptionService_1.generateSecret)();
        const newUser = new User_1.default({ email, password: hashedPassword, secret });
        newUser.save((err, result) => {
            if (err) {
                return res.status(500).send({
                    "message": "Something went wrong",
                    "error": err.message
                });
            }
            const authToken = (0, utils_1.generateAuthToken)({ email });
            console.log(authToken);
            return res.status(200).send({
                "message": "User registered",
                "token": authToken
            });
        });
    });
}
exports.register = register;
