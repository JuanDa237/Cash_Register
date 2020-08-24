import { Request, Response } from "express";

class IndexController {
    
    index (req: Request, res: Response) {
        res.json({ message: "Welcome to my api, The route is /api"});
    }
}

export const indexController = new IndexController();