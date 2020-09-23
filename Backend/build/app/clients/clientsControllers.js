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
exports.clientsControllers = void 0;
const database_1 = __importDefault(require("../../database"));
class ClientsControllers {
    //Get Interval
    listClientsInYear(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var year = new Date().getFullYear();
            return (yield database_1.default).query("SELECT DATE_FORMAT(creationDate, '%m') AS creationDate, active FROM clients WHERE creationDate >= '?-01-01' AND creationDate <= '?-12-31' AND idCompany = ?", [year, year, request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    //Get All List
    listAllClients(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield database_1.default).query("SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate FROM clients WHERE idCompany = ?", [request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    //Get List
    listClients(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield database_1.default).query("SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate FROM clients WHERE active = true AND idCompany = ?", [request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    //Get One
    getOneClient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate FROM clients WHERE id = ? AND active = true AND idCompany = ?", [id, request.user.idCompany])
                .then((dates) => {
                if (dates.length != 0) {
                    return response.status(200).json(dates[0]);
                }
                else {
                    return response.status(404).json({ message: "Not found." });
                }
            });
        });
    }
    //Post
    createClient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            request.body.idCompany = request.user.idCompany;
            return (yield database_1.default).query("INSERT INTO clients SET ?", [request.body])
                .then(value => {
                return response.status(200).json({ message: "Saved client." });
            });
        });
    }
    //Update
    updateClient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("UPDATE clients SET ? WHERE id = ?", [request.body, id])
                .then(value => {
                return response.status(200).json({ message: "Client updated successfully." });
            });
        });
    }
    //Delete
    deleteClient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var date = new Date();
            var year, month, day;
            year = String(date.getFullYear());
            month = String(date.getMonth() + 1);
            day = String(date.getDate());
            if (month.length == 1) {
                month = "0" + month;
            }
            if (day.length == 1) {
                day = "0" + day;
            }
            const { id } = request.params;
            var newDate = year + "-" + month + "-" + day;
            return (yield database_1.default).query("UPDATE clients SET active = false, creationDate = ? WHERE id = ?", [newDate, id])
                .then(value => {
                return response.status(200).json({ message: "Client eliminated successfully." });
            });
        });
    }
}
exports.clientsControllers = new ClientsControllers();
