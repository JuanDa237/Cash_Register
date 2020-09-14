"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticationControllers_1 = require("./authenticationControllers");
class AuthenticationRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        //Post
        this.router.post("/singIn", authenticationControllers_1.authenticationControllers.singIn);
        this.router.post("/singUp", authenticationControllers_1.authenticationControllers.singUp);
    }
}
const authenticationRoutes = new AuthenticationRoutes();
exports.default = authenticationRoutes.router;
