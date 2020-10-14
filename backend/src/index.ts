import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import { createInitialData } from "./app/roles/initialData";

import indexRoutes from "./app/index/index.routes";
import companiesRoutes from "./app/companies/companies.routes";
import categoriesRoutes from "./app/categories/categories.routes";
import productsRoutes from "./app/products/products.routes";
import ingredientsRoutes from "./app/ingredients/ingredients.routes";
import ticketsRoutes from "./app/tickets/tickets.routes";
import clientsRoutes from "./app/clients/clients.routes";
import usersRoutes from "./app/users/users.routes";
import authenticationRoutes from "./app/authentication/authentication.routes";

class Server {
    
    public app: Application;

    constructor() {
        this.app = express();
        this.configExpress();
        this.routes();
        this.initialConfig();
        //Start reading environment variables
        dotenv.config();
    }

    private configExpress(): void {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    private routes(): void {
        this.app.use("/", indexRoutes);
        this.app.use("/api", companiesRoutes);
        this.app.use("/api", categoriesRoutes);
        this.app.use("/api", productsRoutes);
        this.app.use("/api", ingredientsRoutes);
        this.app.use("/api", ticketsRoutes);
        this.app.use("/api", clientsRoutes);
        this.app.use("/api", usersRoutes);
        this.app.use("/api/authentication", authenticationRoutes);
    }

    private initialConfig(): void {
        
        createInitialData();
    }

    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port " + this.app.get("port"));
        });
    }
}

const server = new Server();
server.start();