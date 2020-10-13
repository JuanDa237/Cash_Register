import { Router } from "express";

import { ticketsControllers } from "./ticketsControllers";
import { authenticationJwt } from "../authentication/middlewares/index";

class CategoriesRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {

        //Get Interval
        this.router.get("/tickets/:since/:until", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], ticketsControllers.listTicketsInInterval);
        this.router.get("/tickets/year", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], ticketsControllers.listTicketsInYear);

        //Get list
        this.router.get("/tickets", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], ticketsControllers.listTickets);
        this.router.get("/tickets/products", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], ticketsControllers.listProductsInTickets);
        this.router.get("/ticket/products/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], ticketsControllers.getProductsInTicket);

        //Get one
        this.router.get("/ticket/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], ticketsControllers.getOneTicket);

        //Post
        this.router.post("/ticket", [authenticationJwt.verifyToken, authenticationJwt.isCashier], ticketsControllers.createTicket);
        this.router.post("/ticket/product", [authenticationJwt.verifyToken, authenticationJwt.isCashier], ticketsControllers.createProductInTicket);
    }
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;