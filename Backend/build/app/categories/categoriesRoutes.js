"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesControllers_1 = require("./categoriesControllers");
class CategoriesRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        //Get list    
        this.router.get("/categories", categoriesControllers_1.categoriesControllers.listCategories);
        //Get one
        this.router.get("/category/:id", categoriesControllers_1.categoriesControllers.getOneCategory);
        //Post
        this.router.post("/category", categoriesControllers_1.categoriesControllers.createCategory);
        //Update
        this.router.put("/category/:id", categoriesControllers_1.categoriesControllers.updateCategory);
        //Delete
        this.router.delete("/category/:id", categoriesControllers_1.categoriesControllers.deleteCategory);
    }
}
const categoriesRoutes = new CategoriesRoutes();
exports.default = categoriesRoutes.router;
