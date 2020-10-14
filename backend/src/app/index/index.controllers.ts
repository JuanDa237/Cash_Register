import { Request, Response } from "express";

class IndexController {
    
    public index(request: Request, response: Response): Response {
        return response.json({ message: "Welcome to my api, the documentation is in folder Sources/Postman." });
    }
}

export const indexController = new IndexController();