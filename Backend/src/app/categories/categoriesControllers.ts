import { Request, Response } from "express";

import pool from "../../database";

class CategoriesControllers {
    
    //Get List
    public async listCategories (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name FROM categories WHERE active = true AND idCompany = ?", [req.user.idCompany])
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Get One    
    public async getOneCategory (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT id, name FROM categories WHERE id = ? AND active = true AND idCompany = ?;", [id, req.user.idCompany])
                    .then(dates => {
                        if(dates != 0) {
                            return res.status(200).json(dates);
                        }
                        else {
                            return res.status(404).json({ message: "Not found" });
                        }
                    });
    }

    //Post
    public async createCategory (req: Request, res: Response): Promise<void> {
        req.body.idCompany = req.user.idCompany;
        (await pool).query("INSERT INTO categories SET ?", [req.body]);
        res.status(200).json({ message: "Saved category." });        
    }

    //Update
    public async updateCategory (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE categories SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ message: "Category updated successfully." });
    }

    //Delete
    public async deleteCategory (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("UPDATE categories SET active = false WHERE id = ?", [id]);
        res.status(200).json({ message: "Category eliminated successfully." });
    }
}

export const categoriesControllers = new CategoriesControllers();