import { Router } from "express";

import { authenticationControllers } from "./authenticationControllers";

class AuthenticationRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        
        //Post
        this.router.post("/singIn", authenticationControllers.singIn);
        this.router.post("/singUp", authenticationControllers.singUp);
    }
}

const authenticationRoutes = new AuthenticationRoutes();
export default authenticationRoutes.router;