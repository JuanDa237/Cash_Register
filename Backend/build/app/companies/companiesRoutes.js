"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companiesControllers_1 = require("./companiesControllers");
const index_1 = require("../authentication/middlewares/index");
class CompaniesRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        //Get one
        this.router.get("/company", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isCashier], companiesControllers_1.companiesControllers.getOneCompany);
    }
}
const companiesRoutes = new CompaniesRoutes();
exports.default = companiesRoutes.router;
