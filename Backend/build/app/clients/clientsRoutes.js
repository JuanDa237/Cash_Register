"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientsControllers_1 = require("./clientsControllers");
const index_1 = require("../authentication/middlewares/index");
class CategoriesRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        //Get Interval
        this.router.get("/clients/year", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], clientsControllers_1.clientsControllers.listClientsInYear);
        //Get All List
        this.router.get("/all/clients", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], clientsControllers_1.clientsControllers.listAllClients);
        //Get list    
        this.router.get("/clients", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isCashier], clientsControllers_1.clientsControllers.listClients);
        //Get one
        this.router.get("/client/:id", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isCashier], clientsControllers_1.clientsControllers.getOneClient);
        //Post
        this.router.post("/client", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], clientsControllers_1.clientsControllers.createClient);
        //Update
        this.router.put("/client/:id", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], clientsControllers_1.clientsControllers.updateClient);
        //Delete
        this.router.delete("/client/:id", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], clientsControllers_1.clientsControllers.deleteClient);
    }
}
const categoriesRoutes = new CategoriesRoutes();
exports.default = categoriesRoutes.router;
