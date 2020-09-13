import { Router } from "express";

import { productsController } from "./productsControllers";

class ProductsRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        //Get All List
        this.router.get("/all/products", productsController.listAllProducts);

        //Get list            
        this.router.get("/products", productsController.listProducts);
        this.router.get("/products/ingredients", productsController.listIngredientsInProducts);

        //Get one        
        this.router.get("/product/:id", productsController.getOneProduct);        
        this.router.get("/product/ingredients/:id", productsController.getIngredientsInProduct);

        //Post        
        this.router.post("/product", productsController.createProduct);
        this.router.post("/product/ingredient", productsController.createIngredientInProduct);
        
        //Update
        this.router.put("/product/:id", productsController.updateProduct);
        this.router.put("/product/ingredient/:id", productsController.updateIngredientInProduct);

        //Delete
        this.router.delete("/product/:id", productsController.deleteProduct);
        this.router.delete("/product/ingredient/:id", productsController.deleteIngredientInProduct);
    }
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;