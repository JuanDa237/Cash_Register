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
        this.router.get("/categories", companyControllers_1.companyController.listCategories);
        this.router.get("/products", companyControllers_1.companyController.listProducts);
        this.router.get("/ingredients", companyControllers_1.companyController.listIngredients);
        this.router.get("/products/ingredients", companyControllers_1.companyController.listIngredientsInProducts);
        this.router.get("/clients", companyControllers_1.companyController.listClients);
        this.router.get("/tickets", companyControllers_1.companyController.listTickets);
        this.router.get("/tickets/products", companyControllers_1.companyController.listProductsInTickets);
        //Get one
        this.router.get("/category/:id", companyControllers_1.companyController.getOneProduct);
        this.router.get("/product/:id", companyControllers_1.companyController.getOneProduct);
        this.router.get("/ingredient/:id", companyControllers_1.companyController.getOneIngredient);
        this.router.get("/product/ingredients/:id", companyControllers_1.companyController.getIngredientsInProduct);
        this.router.get("/client/:id", companyControllers_1.companyController.getOneClient);
        this.router.get("/ticket/:id", companyControllers_1.companyController.getOneTicket);
        //Post
        this.router.post("/category", companyControllers_1.companyController.createCategory);
        this.router.post("/product", companyControllers_1.companyController.createProduct);
        this.router.post("/ingredient", companyControllers_1.companyController.createIngredient);
        this.router.post("/product/ingredient", companyControllers_1.companyController.createIngredientInProduct);
        this.router.post("/client", companyControllers_1.companyController.createClient);
        this.router.post("/ticket", companyControllers_1.companyController.createTicket);
        this.router.post("/ticket/product", companyControllers_1.companyController.createProductInTicket);
        //Update
        this.router.put("/category/:id", companyControllers_1.companyController.updateCategory);
        this.router.put("/product/:id", companyControllers_1.companyController.updateProduct);
        this.router.put("/ingredient/:id", companyControllers_1.companyController.updateIngredient);
        this.router.put("/product/ingredient/:id", companyControllers_1.companyController.updateIngredientInProduct);
        this.router.put("/amountIngredients", companyControllers_1.companyController.updateAmountIngredients);
        this.router.put("/client/:id", companyControllers_1.companyController.updateClient);
        //Delete
        this.router.delete("/category/:id", companyControllers_1.companyController.deleteCategory);
        this.router.delete("/product/:id", companyControllers_1.companyController.deleteProduct);
        this.router.delete("/ingredient/:id", companyControllers_1.companyController.deleteIngredient);
        this.router.delete("/product/:id_product/:id_ingredient", companyControllers_1.companyController.deleteIngredientInProduct);
        this.router.delete("/client/:id", companyControllers_1.companyController.deleteClient);
    }
}
const companyRoutes = new CompanyRoutes();
exports.default = companyRoutes.router;
