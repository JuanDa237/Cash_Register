"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketsControllers_1 = require("./ticketsControllers");
class CategoriesRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        //Get Interval
        this.router.get("/tickets/:since/:until", ticketsControllers_1.ticketsControllers.listTicketsInInterval);
        this.router.get("/tickets/year", ticketsControllers_1.ticketsControllers.listTicketsInYear);
        //Get list    
        this.router.get("/tickets", ticketsControllers_1.ticketsControllers.listTickets);
        this.router.get("/tickets/products", ticketsControllers_1.ticketsControllers.listProductsInTickets);
        //Get one
        this.router.get("/ticket/:id", ticketsControllers_1.ticketsControllers.getOneTicket);
        //Post
        this.router.post("/ticket", ticketsControllers_1.ticketsControllers.createTicket);
        this.router.post("/ticket/product", ticketsControllers_1.ticketsControllers.createProductInTicket);
    }
}
const categoriesRoutes = new CategoriesRoutes();
exports.default = categoriesRoutes.router;
