"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesControllers_1 = require("./categoriesControllers");
const index_1 = require("../authentication/middlewares/index");
class CategoriesRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        //Get list    
        this.router.get("/categories", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], categoriesControllers_1.categoriesControllers.listCategories);
        //Get one
        this.router.get("/category/:id", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], categoriesControllers_1.categoriesControllers.getOneCategory);
        //Post
        this.router.post("/category", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], categoriesControllers_1.categoriesControllers.createCategory);
        //Update
        this.router.put("/category/:id", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], categoriesControllers_1.categoriesControllers.updateCategory);
        //Delete
        this.router.delete("/category/:id", [index_1.authenticationJwt.verifyToken, index_1.authenticationJwt.isAdministrator], categoriesControllers_1.categoriesControllers.deleteCategory);
    }
}
const categoriesRoutes = new CategoriesRoutes();
exports.default = categoriesRoutes.router;
