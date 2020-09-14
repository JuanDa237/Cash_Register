"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingredientsControllers_1 = require("./ingredientsControllers");
const index_1 = require("../authentication/middlewares/index");
class IngredientsRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        //Get list
        this.router.get("/ingredients", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isCashier], ingredientsControllers_1.ingredientsControllers.listIngredients);
        //Get one
        this.router.get("/ingredient/:id", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isCashier], ingredientsControllers_1.ingredientsControllers.getOneIngredient);
        //Post
        this.router.post("/ingredient", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], ingredientsControllers_1.ingredientsControllers.createIngredient);
        //Update
        this.router.put("/ingredient/:id", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], ingredientsControllers_1.ingredientsControllers.updateIngredient);
        this.router.put("/amountIngredients", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isCashier], ingredientsControllers_1.ingredientsControllers.updateAmountIngredients);
        //Delete
        this.router.delete("/ingredient/:id", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], ingredientsControllers_1.ingredientsControllers.deleteIngredient);
    }
}
const ingredientsRoutes = new IngredientsRoutes();
exports.default = ingredientsRoutes.router;
