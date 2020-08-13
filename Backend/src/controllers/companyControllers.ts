import { Request, Response } from "express";

import pool from "../database";

class CompanyController {
    
    //Get list

    public async listProducts (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT * FROM products;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listIngredients (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT * FROM ingredients;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listIngredientsInProducts (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT * FROM detail_products_ingredients;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Get one

    public async getOneProduct (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT * FROM products WHERE _id = ?", [id])
                    .then(dates => {
                        if(dates != 0) {
                            return res.status(200).json(dates);
                        }
                        else {
                            return res.status(404).json({ message: "Not found" });
                        }
                    });
    }

    public async getOneIngredient (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT * FROM ingredients WHERE _id = ?", [id])
                    .then(dates => {
                        if(dates != 0) {
                            return res.status(200).json(dates);
                        }
                        else {
                            return res.status(404).json({ message: "Not found" });
                        }
                    });
    }

    public async getIngredientsInProduct (req: Request, res: Response): Promise<void> {
        const { idProduct } = req.params;
        (await pool).query("SELECT * FROM detail_products_ingredients WHERE id_product = ?", [idProduct])
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    } 

    //Post

    public async createProduct (req: Request, res: Response): Promise<void> {
        (await pool).query("INSERT INTO products SET ?", [req.body])
                    .then(async function(value) {

                        (await pool).query("SELECT _id FROM products WHERE _id=(SELECT max(_id) FROM products);").then(dates => {
                            res.status(200).json({
                            message: "Saved product.",
                            _id: dates
                            });
                        });
                    });                                                 
    }

    public async createIngredient (req: Request, res: Response): Promise<void> {
        (await pool).query("INSERT INTO ingredients SET ?", [req.body]);
        res.status(200).json({ message: "Saved ingredient." });
    }

    public async createIngredientInProduct (req: Request, res: Response): Promise<void> {        
        (await pool).query("INSERT INTO detail_products_ingredients SET ?", [req.body]);
        res.status(200).json({ message: "Saved ingredient in product." });
    }

    //Update

    public async updateProduct (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE products SET ? WHERE _id = ?", [req.body, id]);
        res.status(200).json({ message: "Product updated successfully." });
    }

    public async updateIngredient (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE ingredients SET ? WHERE _id = ?", [req.body, id]);
        res.status(200).json({ message: "Ingredient updated successfully." });
    }

    //Delete

    public async deleteProduct (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("DELETE FROM products WHERE _id = ?", [id]);
        res.status(200).json({ message: "Product eliminated successfully." });
    }

    public async deleteIngredient (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("DELETE FROM ingredients WHERE _id = ?", [id]);
        res.status(200).json({ message: "Ingredient eliminated successfully." });
    }

    public async deleteIngredientInProduct (req: Request, res: Response): Promise<void> {
        const { id_product, id_ingredient } = req.params;
        (await pool).query("DELETE FROM detail_products_ingredients WHERE id_product = ? AND id_ingredient = ?", [id_product, id_ingredient]);
        res.status(200).json({ message: "Ingredient in product eliminated successfully." });
    }
}

export const companyController = new CompanyController();