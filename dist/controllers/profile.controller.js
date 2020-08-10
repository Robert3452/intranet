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
exports.signin = exports.signup = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, names, lastnames, personal_email } = req.body;
    let user = {
        password,
        email,
        names,
        lastnames,
        personal_email
    };
    user = new User_1.default(user);
    try {
        yield user.save();
        res.json({ message: "user created" });
    }
    catch (error) {
        let status = 500;
        if (error.name == "MongoError")
            status = 400;
        res.status(status).json({ message: error });
    }
});
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user._id, email: user.email
    }, config_1.default.jwtSecret, { expiresIn: 86400 });
};
exports.signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw { name: "EmptyFields", message: "please fill all the fields that are required" };
        const user = yield User_1.default.findOne({ email });
        if (!user)
            throw { name: "UserDoesntExist", message: "This user doesn't exist" };
        const matchPwd = yield user.matchPassword(password);
        console.log(matchPwd);
        if (!matchPwd)
            throw { name: "NoMatch", message: "the password not match" };
        return res.json({ token: createToken(user) });
    }
    catch (error) {
        const name = error.name;
        let status = 500;
        switch (name) {
            case "EmptyFields":
                status = 401;
                break;
            case "UserDoesntExist":
                status = 401;
                break;
            case "NoMatch":
                status = 400;
                break;
            default:
                break;
        }
        return res.status(status).json({ message: error });
    }
});
