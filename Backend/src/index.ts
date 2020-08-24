import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import indexRoutes from "./app/index/indexRoutes";
import categoriesRoutes from "./app/categories/categoriesRoutes";
import productsRoutes from "./app/products/productsRoutes";
import ingredientsRoutes from "./app/ingredients/ingredientsRoutes";
import ticketsRoutes from "./app/tickets/ticketsRoutes";
import clientsRoutes from "./app/clients/clientsRoutes";

class Server {
    
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes(); 
    }

    config(): void {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use("/", indexRoutes);
        this.app.use("/api", categoriesRoutes);
        this.app.use("/api", productsRoutes);
        this.app.use("/api", ingredientsRoutes);
        this.app.use("/api", ticketsRoutes);
        this.app.use("/api", clientsRoutes);
    }

    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port " + this.app.get("port"));
        });
    }
}

const server = new Server();
server.start();