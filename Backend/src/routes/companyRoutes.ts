import { Router } from "express";

import { companyController } from "../controllers/companyControllers";

class CompanyRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        
        //Get list    
        this.router.get("/products", companyController.listProducts);
        this.router.get("/ingredients", companyController.listIngredients);
        this.router.get("/products/ingredients", companyController.listIngredientsInProducts);

        //Get one
        this.router.get("/product/:id", companyController.getOneProduct);
        this.router.get("/ingredient/:id", companyController.getOneIngredient);
        this.router.get("/product/ingredients/:id", companyController.getIngredientsInProduct);

        //Post
        this.router.post("/product", companyController.createProduct);
        this.router.post("/ingredient", companyController.createIngredient);
        this.router.post("/product/ingredient", companyController.createIngredientInProduct);
        
        //Update
        this.router.put("/product/:id", companyController.updateProduct);
        this.router.put("/ingredient/:id", companyController.updateIngredient);
        this.router.put("/product/ingredient/:id", companyController.updateIngredientInProduct);
        this.router.put("/amountIngredients", companyController.updateAmountIngredients);

        //Delete
        this.router.delete("/product/:id", companyController.deleteProduct);
        this.router.delete("/ingredient/:id", companyController.deleteIngredient);
        this.router.delete("/product/:id_product/:id_ingredient", companyController.deleteIngredientInProduct);
    }
}

const companyRoutes = new CompanyRoutes();
export default companyRoutes.router;