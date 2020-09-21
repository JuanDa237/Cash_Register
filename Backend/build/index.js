"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const initialSetup_1 = require("./app/roles/initialSetup");
const indexRoutes_1 = __importDefault(require("./app/index/indexRoutes"));
const companiesRoutes_1 = __importDefault(require("./app/companies/companiesRoutes"));
const categoriesRoutes_1 = __importDefault(require("./app/categories/categoriesRoutes"));
const productsRoutes_1 = __importDefault(require("./app/products/productsRoutes"));
const ingredientsRoutes_1 = __importDefault(require("./app/ingredients/ingredientsRoutes"));
const ticketsRoutes_1 = __importDefault(require("./app/tickets/ticketsRoutes"));
const clientsRoutes_1 = __importDefault(require("./app/clients/clientsRoutes"));
const authenticationRoutes_1 = __importDefault(require("./app/authentication/authenticationRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
        //Start reading environment variables
        dotenv_1.default.config();
        //Create default roles
        initialSetup_1.createRoles();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/", indexRoutes_1.default);
        this.app.use("/api", companiesRoutes_1.default);
        this.app.use("/api", categoriesRoutes_1.default);
        this.app.use("/api", productsRoutes_1.default);
        this.app.use("/api", ingredientsRoutes_1.default);
        this.app.use("/api", ticketsRoutes_1.default);
        this.app.use("/api", clientsRoutes_1.default);
        this.app.use("/api/authentication", authenticationRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port " + this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
