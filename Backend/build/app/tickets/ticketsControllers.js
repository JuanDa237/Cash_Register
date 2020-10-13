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
    listTicketsInInterval(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { since, until } = request.params;
            return (yield database_1.default).query("SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE creationDate >= ? AND creationDate <= ? AND idCompany = ?", [since, until, request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    listTicketsInYear(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var year = new Date().getFullYear();
            return (yield database_1.default).query("SELECT DATE_FORMAT(creationDate, '%m') AS creationDate, total, homeDelivery FROM tickets WHERE creationDate >= '?-01-01' AND creationDate <= '?-12-31' AND idCompany = ?", [year, year, request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    //Get list
    listTickets(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield database_1.default).query("SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE idCompany = ?", [request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    listProductsInTickets(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield database_1.default).query("SELECT * FROM productsInTickets WHERE idCompany = ?", [request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    //Get one
    getOneTicket(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE id = ? AND idCompany = ?", [id, request.user.idCompany])
                .then((dates) => {
                if (dates.length != 0) {
                    return response.status(200).json(dates[0]);
                }
                else {
                    return response.status(404).json({ message: "Not found" });
                }
            });
        });
    }
    getProductsInTicket(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("SELECT * FROM productsInTickets WHERE idTicket = ? AND idCompany = ?", [id, request.user.idCompany])
                .then(dates => {
                if (dates != 0) {
                    return response.status(200).json(dates);
                }
                else {
                    return response.status(404).json({ message: "Not found" });
                }
            });
        });
    }
    //Post
    createTicket(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            request.body.idCompany = request.user.idCompany;
            return (yield database_1.default).query("INSERT INTO tickets SET ?", [request.body])
                .then(function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    //Edit this
                    return response.status(200).json({
                        message: "Saved ticket.",
                        id: value.insertId
                    });
                });
            });
            ;
        });
    }
    createProductInTicket(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            request.body.idCompany = request.user.idCompany;
            return (yield database_1.default).query("INSERT INTO productsInTickets SET ?", [request.body])
                .then(value => {
                return response.status(200).json({ message: "Saved product in ticket." });
            });
        });
    }
}
exports.ticketsControllers = new TicketsControllers();
