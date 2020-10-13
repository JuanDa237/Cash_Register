import { Router } from "express";

import { companiesControllers } from "./companiesControllers";
import { authenticationJwt } from "../authentication/middlewares/index";

class CompaniesRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {        
        //Get one
        this.router.get("/company", [authenticationJwt.verifyToken, authenticationJwt.isCashier], companiesControllers.getOneCompany);
    }
}

const companiesRoutes = new CompaniesRoutes();
export default companiesRoutes.router;