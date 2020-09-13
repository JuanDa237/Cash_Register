"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingredientsControllers_1 = require("./ingredientsControllers");
class IngredientsRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        //Get list
        this.router.get("/ingredients", ingredientsControllers_1.ingredientsControllers.listIngredients);
        //Get one
        this.router.get("/ingredient/:id", ingredientsControllers_1.ingredientsControllers.getOneIngredient);
        //Post
        this.router.post("/ingredient", ingredientsControllers_1.ingredientsControllers.createIngredient);
        //Update
        this.router.put("/ingredient/:id", ingredientsControllers_1.ingredientsControllers.updateIngredient);
        this.router.put("/amountIngredients", ingredientsControllers_1.ingredientsControllers.updateAmountIngredients);
        //Delete
        this.router.delete("/ingredient/:id", ingredientsControllers_1.ingredientsControllers.deleteIngredient);
    }
}
const ingredientsRoutes = new IngredientsRoutes();
exports.default = ingredientsRoutes.router;
