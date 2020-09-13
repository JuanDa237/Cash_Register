"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsControllers_1 = require("./productsControllers");
class ProductsRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        //Get All List
        this.router.get("/all/products", productsControllers_1.productsController.listAllProducts);
        //Get list            
        this.router.get("/products", productsControllers_1.productsController.listProducts);
        this.router.get("/products/ingredients", productsControllers_1.productsController.listIngredientsInProducts);
        //Get one        
        this.router.get("/product/:id", productsControllers_1.productsController.getOneProduct);
        this.router.get("/product/ingredients/:id", productsControllers_1.productsController.getIngredientsInProduct);
        //Post        
        this.router.post("/product", productsControllers_1.productsController.createProduct);
        this.router.post("/product/ingredient", productsControllers_1.productsController.createIngredientInProduct);
        //Update
        this.router.put("/product/:id", productsControllers_1.productsController.updateProduct);
        this.router.put("/product/ingredient/:id", productsControllers_1.productsController.updateIngredientInProduct);
        //Delete
        this.router.delete("/product/:id", productsControllers_1.productsController.deleteProduct);
        this.router.delete("/product/ingredient/:id", productsControllers_1.productsController.deleteIngredientInProduct);
    }
}
const productsRoutes = new ProductsRoutes();
exports.default = productsRoutes.router;
