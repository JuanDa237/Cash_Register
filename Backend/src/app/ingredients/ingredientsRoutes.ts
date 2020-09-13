import { Router } from "express";

import { ingredientsControllers } from "./ingredientsControllers";

class IngredientsRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        //Get list
        this.router.get("/ingredients", ingredientsControllers.listIngredients);

        //Get one
        this.router.get("/ingredient/:id", ingredientsControllers.getOneIngredient);

        //Post
        this.router.post("/ingredient", ingredientsControllers.createIngredient);

        //Update
        this.router.put("/ingredient/:id", ingredientsControllers.updateIngredient);
        this.router.put("/amountIngredients", ingredientsControllers.updateAmountIngredients);

        //Delete
        this.router.delete("/ingredient/:id", ingredientsControllers.deleteIngredient);
    }
}

const ingredientsRoutes = new IngredientsRoutes();
export default ingredientsRoutes.router;