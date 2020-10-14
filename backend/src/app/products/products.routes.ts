import { Router } from "express";

import { productsController } from "./products.controllers";
import { authenticationJwt } from "../authentication/middlewares/index";

class ProductsRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        //Get All List
        this.router.get("/all/products", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], productsController.listAllProducts);

        //Get list            
        this.router.get("/products", [authenticationJwt.verifyToken, authenticationJwt.isCashier], productsController.listProducts);
        this.router.get("/products/ingredients", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], productsController.listIngredientsInProducts);

        //Get one        
        this.router.get("/product/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], productsController.getOneProduct);        
        this.router.get("/product/ingredients/:id", [authenticationJwt.verifyToken, authenticationJwt.isCashier], productsController.getIngredientsInProduct);

        //Post        
        this.router.post("/product", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], productsController.createProduct);
        this.router.post("/product/ingredient", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], productsController.createIngredientInProduct);
        
        //Update
        this.router.put("/product/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], productsController.updateProduct);
        this.router.put("/product/ingredient/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], productsController.updateIngredientInProduct);

        //Delete
        this.router.delete("/product/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], productsController.deleteProduct);
        this.router.delete("/product/ingredient/:id", [authenticationJwt.verifyToken, authenticationJwt.isAdministrator], productsController.deleteIngredientInProduct);
    }
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;