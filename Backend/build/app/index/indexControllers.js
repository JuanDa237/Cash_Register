"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(request, response) {
        return response.json({ message: "Welcome to my api, the documentation is in folder Sources/Postman." });
    }
}
exports.indexController = new IndexController();
