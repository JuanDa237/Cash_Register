import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import { createRoles } from "./app/roles/initialSetup";

import indexRoutes from "./app/index/indexRoutes";
import companiesRoutes from "./app/companies/companiesRoutes";
import categoriesRoutes from "./app/categories/categoriesRoutes";
import productsRoutes from "./app/products/productsRoutes";
import ingredientsRoutes from "./app/ingredients/ingredientsRoutes";
import ticketsRoutes from "./app/tickets/ticketsRoutes";
import clientsRoutes from "./app/clients/clientsRoutes";
import authenticationRoutes from "./app/authentication/authenticationRoutes";

class Server {
    
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();

        //Start reading environment variables
        dotenv.config();

        //Create default roles
        createRoles();
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
        this.app.use("/api", companiesRoutes);
        this.app.use("/api", categoriesRoutes);
        this.app.use("/api", productsRoutes);
        this.app.use("/api", ingredientsRoutes);
        this.app.use("/api", ticketsRoutes);
        this.app.use("/api", clientsRoutes);
        this.app.use("/api/authentication", authenticationRoutes);
    }

    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port " + this.app.get("port"));
        });
    }
}

const server = new Server();
server.start();