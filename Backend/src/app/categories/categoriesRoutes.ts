import { Router } from "express";

import { categoriesControllers } from "./categoriesControllers";
import { authenticationJwt } from "../authentication/middlewares/index";

class CategoriesRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {        
        //Get list
        this.router.get("/categories", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], categoriesControllers.listCategories);

        //Get one
        this.router.get("/category/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], categoriesControllers.getOneCategory);

        //Post
        this.router.post("/category", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], categoriesControllers.createCategory);
        
        //Update
        this.router.put("/category/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], categoriesControllers.updateCategory);

        //Delete
        this.router.delete("/category/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], categoriesControllers.deleteCategory);
    }
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;