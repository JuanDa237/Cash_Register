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
        this.router.get("/categories", companyController.listCategories);
        this.router.get("/products", companyController.listProducts);
        this.router.get("/ingredients", companyController.listIngredients);
        this.router.get("/products/ingredients", companyController.listIngredientsInProducts);
        this.router.get("/clients", companyController.listClients);
        this.router.get("/tickets", companyController.listTickets);
        this.router.get("/tickets/products", companyController.listProductsInTickets);

        //Get one
        this.router.get("/category/:id", companyController.getOneProduct);
        this.router.get("/product/:id", companyController.getOneProduct);
        this.router.get("/ingredient/:id", companyController.getOneIngredient);
        this.router.get("/product/ingredients/:id", companyController.getIngredientsInProduct);
        this.router.get("/client/:id", companyController.getOneClient);
        this.router.get("/ticket/:id", companyController.getOneTicket);

        //Post
        this.router.post("/category", companyController.createCategory);
        this.router.post("/product", companyController.createProduct);
        this.router.post("/ingredient", companyController.createIngredient);
        this.router.post("/product/ingredient", companyController.createIngredientInProduct);
        this.router.post("/client", companyController.createClient);
        this.router.post("/ticket", companyController.createTicket);
        this.router.post("/ticket/product", companyController.createProductInTicket);
        
        //Update
        this.router.put("/category/:id", companyController.updateCategory);
        this.router.put("/product/:id", companyController.updateProduct);
        this.router.put("/ingredient/:id", companyController.updateIngredient);
        this.router.put("/product/ingredient/:id", companyController.updateIngredientInProduct);
        this.router.put("/amountIngredients", companyController.updateAmountIngredients);
        this.router.put("/client/:id", companyController.updateClient);        

        //Delete
        this.router.delete("/category/:id", companyController.deleteCategory);
        this.router.delete("/product/:id", companyController.deleteProduct);
        this.router.delete("/ingredient/:id", companyController.deleteIngredient);
        this.router.delete("/product/:id_product/:id_ingredient", companyController.deleteIngredientInProduct);
        this.router.delete("/client/:id", companyController.deleteClient);        
    }
}

const companyRoutes = new CompanyRoutes();
export default companyRoutes.router;