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
exports.authenticationControllers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../../database"));
const User_1 = require("../users/models/User");
class AuthenticationControllers {
    //Post
    singIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, password } = req.body;
            (yield database_1.default).query("SELECT id, password FROM users WHERE userName = ?", [userName])
                .then((dates) => __awaiter(this, void 0, void 0, function* () {
                if (dates != 0) {
                    const correctPassword = yield User_1.validatePassword(password, dates[0].password);
                    if (correctPassword) {
                        const token = jsonwebtoken_1.default.sign({
                            id: dates[0].id
                        }, process.env.TOKEN_SECRET || "tokenTest", {
                            expiresIn: 86400 //The token expires in 24 hours
                        });
                        return res.status(200).header("token", token).set('Access-Control-Expose-Headers', 'token').json({ message: "Sing in succesfully." });
                    }
                    else {
                        return res.status(401).json({ message: "Password is wrong." });
                    }
                }
                else {
                    return res.status(400).json({ message: "Username not found." });
                }
            }));
        });
    }
    singUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCompany, roleName, userName, password, name } = req.body;
            var idRole = 0;
            var itsOk = false;
            //Validate userName
            yield (yield database_1.default).query("SELECT id FROM users WHERE userName = ?", [userName])
                .then((dates) => {
                if (dates.length > 0) {
                    return res.status(401).json({ message: "Username '" + userName + "' is in use." });
                }
                else {
                    itsOk = true;
                }
            });
            if (itsOk) {
                itsOk = false;
                //Validate role
                if (roleName != null) {
                    yield (yield database_1.default).query("SELECT * FROM roles WHERE name = ?", [roleName])
                        .then((dates) => {
                        if (dates.length > 0) {
                            idRole = dates[0].id;
                            itsOk = true;
                        }
                        else {
                            return res.status(400).json({ message: "Role '" + roleName + "' not found." });
                        }
                    });
                }
                else {
                    yield (yield database_1.default).query("SELECT * FROM roles WHERE name = 'user';")
                        .then((dates) => {
                        if (dates.length > 0) {
                            idRole = dates[0].id;
                            itsOk = true;
                        }
                        else {
                            return res.status(400).json({ message: "Role user not found." });
                        }
                    });
                }
                if (itsOk) {
                    const newUser = {
                        idCompany: idCompany,
                        idRole: idRole,
                        userName: userName,
                        password: yield User_1.encryptPassword(password),
                        name: name
                    };
                    (yield database_1.default).query("INSERT INTO users SET ?", [newUser])
                        .then(function (value) {
                        return __awaiter(this, void 0, void 0, function* () {
                            const token = jsonwebtoken_1.default.sign({
                                id: value.insertId
                            }, process.env.TOKEN_SECRET || "tokenTest", {
                                expiresIn: 86400 //The token expires in 24 hours
                            });
                            newUser.password = "";
                            return res.status(200).header("token", token).set('Access-Control-Expose-Headers', 'token').json({
                                message: "Saved user.",
                                user: newUser
                            });
                        });
                    });
                }
            }
        });
    }
}
exports.authenticationControllers = new AuthenticationControllers();
