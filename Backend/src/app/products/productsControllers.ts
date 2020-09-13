import { Request, Response } from "express";

import pool from "../../database";

class ProductsController {
    
    //Get All List
    public async listAllProducts (req: Request, res: Response): Promise<void> {
        
        (await pool).query("SELECT id, name, price FROM products;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Get list

    public async listProducts (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name, price FROM products WHERE active = true;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listIngredientsInProducts (req: Request, res: Response): Promise<void> {
        
        (await pool).query("SELECT id, idProduct, idIngredient, spendingAmount FROM detailProductsIngredients WHERE active = true;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Get one
    public async getOneProduct (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT id, idCategory , name, price FROM products WHERE id = ? AND active = true;", [id])
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
        
        const { id } = req.params;
        (await pool).query("SELECT id, idProduct, idIngredient, spendingAmount FROM detailProductsIngredients WHERE idProduct = ? AND active = true;", [id])
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Post

    public async createProduct (req: Request, res: Response): Promise<void> {
        
        (await pool).query("INSERT INTO products SET ?", [req.body])
                    .then(async function(value: any) {

                        res.status(200).json({
                            message: "Saved product.",
                            id: value.insertId
                        });
                    });
    }

    public async createIngredientInProduct (req: Request, res: Response): Promise<void> {        
        (await pool).query("INSERT INTO detailProductsIngredients SET ?", [req.body]);
        res.status(200).json({ message: "Saved ingredient in product." });
    }

    //Update

    public async updateProduct (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE products SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ message: "Product updated successfully." });
    }

    public async updateIngredientInProduct (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE detailProductsIngredients SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ message: "Ingredient in product updated successfully." });
    }

    //Delete

    public async deleteProduct (req: Request, res: Response): Promise<void> {
        
        const { id } = req.params;
        (await pool).query("UPDATE products SET active = false WHERE id = ?", [id]);
        res.status(200).json({ message: "Product eliminated successfully." });
    }

    public async deleteIngredientInProduct (req: Request, res: Response): Promise<void> {
        
        const { id } = req.params;
        (await pool).query("UPDATE detailProductsIngredients SET active = false WHERE id = ?", [id]);
        res.status(200).json({ message: "Ingredient in product eliminated successfully." });
    }
}

export const productsController = new ProductsController();