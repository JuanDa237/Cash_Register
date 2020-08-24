import { Router } from "express";

import { categoriesControllers } from "./categoriesControllers";

class CategoriesRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {        
        //Get list    
        this.router.get("/categories", categoriesControllers.listCategories);

        //Get one
        this.router.get("/category/:id", categoriesControllers.getOneCategory);

        //Post
        this.router.post("/category", categoriesControllers.createCategory);
        
        //Update
        this.router.put("/category/:id", categoriesControllers.updateCategory);

        //Delete
        this.router.delete("/category/:id", categoriesControllers.deleteCategory);
    }
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;