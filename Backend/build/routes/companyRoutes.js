"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyControllers_1 = require("../controllers/companyControllers");
class CompanyRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        //Get list    
        this.router.get("/products", companyControllers_1.companyController.listProducts);
        this.router.get("/ingredients", companyControllers_1.companyController.listIngredients);
        this.router.get("/products/ingredients", companyControllers_1.companyController.listIngredientsInProducts);
        //Get one
        this.router.get("/product/:id", companyControllers_1.companyController.getOneProduct);
        this.router.get("/ingredient/:id", companyControllers_1.companyController.getOneIngredient);
        this.router.get("/product/ingredients/:id", companyControllers_1.companyController.getIngredientsInProduct);
        //Post
        this.router.post("/product", companyControllers_1.companyController.createProduct);
        this.router.post("/ingredient", companyControllers_1.companyController.createIngredient);
        this.router.post("/product/ingredient", companyControllers_1.companyController.createIngredientInProduct);
        //Update
        this.router.put("/product/:id", companyControllers_1.companyController.updateProduct);
        this.router.put("/ingredient/:id", companyControllers_1.companyController.updateIngredient);
        //Delete
        this.router.delete("/product/:id", companyControllers_1.companyController.deleteProduct);
        this.router.delete("/ingredient/:id", companyControllers_1.companyController.deleteIngredient);
        this.router.delete("/product/:id_product/:id_ingredient", companyControllers_1.companyController.deleteIngredientInProduct);
    }
}
const companyRoutes = new CompanyRoutes();
exports.default = companyRoutes.router;
