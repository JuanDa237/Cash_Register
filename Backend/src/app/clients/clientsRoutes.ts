import { Router } from "express";

import { clientsControllers } from "./clientsControllers";

class CategoriesRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        //Get All List
        this.router.get("/all/clients", clientsControllers.listAllClients);

        //Get list    
        this.router.get("/clients", clientsControllers.listClients);

        //Get one
        this.router.get("/client/:id", clientsControllers.getOneClient);

        //Post
        this.router.post("/client", clientsControllers.createClient);
        
        //Update
        this.router.put("/client/:id", clientsControllers.updateClient);        

        //Delete
        this.router.delete("/client/:id", clientsControllers.deleteClient); 
    }
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;