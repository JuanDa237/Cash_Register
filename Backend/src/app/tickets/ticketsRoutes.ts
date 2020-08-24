import { Router } from "express";

import { ticketsControllers } from "./ticketsControllers";

class CategoriesRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        //Get list    
        this.router.get("/tickets", ticketsControllers.listTickets);
        this.router.get("/tickets/products", ticketsControllers.listProductsInTickets);

        //Get one
        this.router.get("/ticket/:id", ticketsControllers.getOneTicket);

        //Post
        this.router.post("/ticket", ticketsControllers.createTicket);
        this.router.post("/ticket/product", ticketsControllers.createProductInTicket);
    }
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;