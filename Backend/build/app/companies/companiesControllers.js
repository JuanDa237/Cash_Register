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
exports.companiesControllers = void 0;
const database_1 = __importDefault(require("../../database"));
class CompaniesControllers {
    //Get one
    getOneCompany(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield database_1.default).query("SELECT name, imageUrl, ticketMessage FROM companies WHERE id = ? AND active = true;", [request.user.idCompany])
                .then(dates => {
                if (dates != 0) {
                    return response.status(200).json(dates);
                }
                else {
                    return response.status(404).json({ message: "Not found." });
                }
            });
        });
    }
}
exports.companiesControllers = new CompaniesControllers();
