import { Router } from "express";

import { usersControllers } from "./users.controllers";
import { authenticationJwt } from "../authentication/middlewares/index";

class UsersRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {

        //Get Interval
        this.router.get("/user", [authenticationJwt.verifyToken, authenticationJwt.isCashier], usersControllers.loggedUser);
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;