"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketsControllers_1 = require("./ticketsControllers");
const index_1 = require("../authentication/middlewares/index");
class CategoriesRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        //Get Interval
        this.router.get("/tickets/:since/:until", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], ticketsControllers_1.ticketsControllers.listTicketsInInterval);
        this.router.get("/tickets/year", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], ticketsControllers_1.ticketsControllers.listTicketsInYear);
        //Get list
        this.router.get("/tickets", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], ticketsControllers_1.ticketsControllers.listTickets);
        this.router.get("/tickets/products", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], ticketsControllers_1.ticketsControllers.listProductsInTickets);
        this.router.get("/ticket/products/:id", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], ticketsControllers_1.ticketsControllers.getProductsInTicket);
        //Get one
        this.router.get("/ticket/:id", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], ticketsControllers_1.ticketsControllers.getOneTicket);
        //Post
        this.router.post("/ticket", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isCashier], ticketsControllers_1.ticketsControllers.createTicket);
        this.router.post("/ticket/product", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isCashier], ticketsControllers_1.ticketsControllers.createProductInTicket);
    }
}
const categoriesRoutes = new CategoriesRoutes();
exports.default = categoriesRoutes.router;
