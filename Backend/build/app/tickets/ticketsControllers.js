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
exports.ticketsControllers = void 0;
const database_1 = __importDefault(require("../../database"));
class TicketsControllers {
    //Get Interval
    listTicketsInInterval(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { since, until } = req.params;
            (yield database_1.default).query("SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE creationDate >= ? AND creationDate <= ? AND idCompany = ?", [since, until, req.user.idCompany])
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    listTicketsInYear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var year = new Date().getFullYear();
            (yield database_1.default).query("SELECT DATE_FORMAT(creationDate, '%m') AS creationDate, total, homeDelivery FROM tickets WHERE creationDate >= '?-01-01' AND creationDate <= '?-12-31' AND idCompany = ?", [year, year, req.user.idCompany])
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    //Get list
    listTickets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE idCompany = ?", [req.user.idCompany])
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    listProductsInTickets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("SELECT * FROM productsInTickets WHERE idCompany = ?", [req.user.idCompany])
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    //Get one
    getOneTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE id = ? AND idCompany = ?", [id, req.user.idCompany])
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
    getProductsInTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("SELECT * FROM productsInTickets WHERE idTicket = ? AND idCompany = ?", [id, req.user.idCompany])
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
    createTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.idCompany = req.user.idCompany;
            (yield database_1.default).query("INSERT INTO tickets SET ?", [req.body])
                .then(function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    (yield database_1.default).query("SELECT id FROM tickets WHERE id=(SELECT max(id) FROM tickets);")
                        .then(dates => {
                        res.status(200).json({
                            message: "Saved ticket.",
                            id: dates
                        });
                    });
                });
            });
            ;
        });
    }
    createProductInTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.idCompany = req.user.idCompany;
            (yield database_1.default).query("INSERT INTO productsInTickets SET ?", [req.body]);
            res.status(200).json({ message: "Saved product in ticket." });
        });
    }
}
exports.ticketsControllers = new TicketsControllers();
