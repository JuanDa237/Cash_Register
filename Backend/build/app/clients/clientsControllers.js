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
    listClientsInYear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var year = new Date().getFullYear();
            (yield database_1.default).query("SELECT DATE_FORMAT(creationDate, '%m') AS creationDate, active FROM clients WHERE creationDate >= '?-01-01' AND creationDate <= '?-12-31'", [year, year])
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    //Get All List
    listAllClients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate FROM clients;")
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    //Get List
    listClients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate FROM clients WHERE active = true;")
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    //Get One
    getOneClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate FROM clients WHERE id = ? AND active = true;", [id])
                .then(dates => {
                if (dates != 0) {
                    return res.status(200).json(dates);
                }
                else {
                    return res.status(404).json({ message: "Not found" });
                }
            });
        });
    }
    //Post
    createClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("INSERT INTO clients SET ?", [req.body]);
            res.status(200).json({ message: "Saved client." });
        });
    }
    //Update
    updateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("UPDATE clients SET ? WHERE id = ?", [req.body, id]);
            res.status(200).json({ message: "Client updated successfully." });
        });
    }
    //Delete
    deleteClient(req, res) {
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
            const { id } = req.params;
            var newDate = year + "-" + month + "-" + day;
            (yield database_1.default).query("UPDATE clients SET active = false, creationDate = ? WHERE id = ?", [newDate, id]);
            res.status(200).json({ message: "Client eliminated successfully." });
        });
    }
}
exports.clientsControllers = new ClientsControllers();
