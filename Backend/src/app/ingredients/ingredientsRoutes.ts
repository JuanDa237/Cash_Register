import { Router } from "express";

import { ingredientsControllers } from "./ingredientsControllers";
import { authenticationJwt } from "../authentication/middlewares/index";

class IngredientsRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        //Get list
        this.router.get("/ingredients", [authenticationJwt.verifyToken, authenticationJwt.isCashier], ingredientsControllers.listIngredients);

        //Get one
        this.router.get("/ingredient/:id", [authenticationJwt.verifyToken, authenticationJwt.isCashier], ingredientsControllers.getOneIngredient);

        //Post
        this.router.post("/ingredient", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], ingredientsControllers.createIngredient);

        //Update
        this.router.put("/ingredient/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], ingredientsControllers.updateIngredient);
        this.router.put("/amountIngredients", [authenticationJwt.verifyToken, authenticationJwt.isCashier], ingredientsControllers.updateAmountIngredients);

        //Delete
        this.router.delete("/ingredient/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], ingredientsControllers.deleteIngredient);
    }
}

const ingredientsRoutes = new IngredientsRoutes();
export default ingredientsRoutes.router;