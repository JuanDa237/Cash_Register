import { Request, Response } from "express";

import pool from "../../database";

class CategoriesControllers {
    
    //Get List
    public async listCategories(request: Request, response: Response): Promise<Response> {
        return (await pool).query("SELECT id, name FROM categories WHERE active = true AND idCompany = ?", [request.user.idCompany])
                        .then(dates => {
                            return response.status(200).json(dates);
                        });
    }

    //Get One    
    public async getOneCategory(request: Request, response: Response): Promise<Response> {
        
        const { id } = request.params;

        return (await pool).query("SELECT id, name FROM categories WHERE id = ? AND active = true AND idCompany = ?;", [id, request.user.idCompany])
                        .then(dates => {
                            
                            if(dates != 0) {
                                return response.status(200).json(dates);
                            }
                            else {
                                return response.status(404).json({ message: "Not found" });
                            }
                        });
    }

    //Post
    public async createCategory(request: Request, response: Response): Promise<Response> {
        request.body.idCompany = request.user.idCompany;
        return (await pool).query("INSERT INTO categories SET ?", [request.body])
                        .then(value => {
                            return response.status(200).json({ message: "Saved category." });
                        });
    }

    //Update
    public async updateCategory(request: Request, response: Response): Promise<Response>  {
        const { id } = request.params;
        return (await pool).query("UPDATE categories SET ? WHERE id = ?", [request.body, id])
                        .then(value => {
                            return response.status(200).json({ message: "Category updated successfully." });
                        });
    }

    //Delete
    public async deleteCategory(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        return (await pool).query("UPDATE categories SET active = false WHERE id = ?", [id])
                        .then(value => {
                            return response.status(200).json({ message: "Category eliminated successfully." });
                        });
    }
}

export const categoriesControllers = new CategoriesControllers();