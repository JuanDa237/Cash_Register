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
exports.isCashier = exports.isAdministrator = exports.isUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../../../database"));
function verifyToken(request, response, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = request.header("authentication-token")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token)
                return response.status(403).json({ message: "No token provided." });
            const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "tokentest");
            (yield database_1.default).query("SELECT idCompany, idRole, userName FROM users WHERE id = ?", [payload.id])
                .then((dates) => {
                if (dates.length > 0) {
                    request.user = dates[0];
                    return next();
                }
                else {
                    return response.status(404).json({ message: "User not found." });
                }
            });
        }
        catch (error) {
            return response.status(401).json({ message: "Unauthorized." });
        }
    });
}
exports.verifyToken = verifyToken;
function isUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        (yield database_1.default).query("SELECT name FROM roles WHERE id = ?", [request.user.idRole])
            .then((date) => {
            if (date.length > 0 && (date[0].name == "administrator" || date[0].name == "cashier" || date[0].name == "user")) {
                return next();
            }
            else {
                return response.status(401).json({ message: "Unauthorized." });
            }
        });
    });
}
exports.isUser = isUser;
function isAdministrator(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        (yield database_1.default).query("SELECT name FROM roles WHERE id = ?", [request.user.idRole])
            .then((date) => {
            if (date.length > 0 && date[0].name == "administrator") {
                return next();
            }
            else {
                return response.status(401).json({ message: "Unauthorized." });
            }
        });
    });
}
exports.isAdministrator = isAdministrator;
function isCashier(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        (yield database_1.default).query("SELECT name FROM roles WHERE id = ?", [request.user.idRole])
            .then((date) => {
            if (date.length > 0 && (date[0].name == "administrator" || date[0].name == "cashier")) {
                return next();
            }
            else {
                return response.status(401).json({ message: "Unauthorized." });
            }
        });
    });
}
exports.isCashier = isCashier;
