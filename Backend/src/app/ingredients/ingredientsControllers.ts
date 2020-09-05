import { Request, Response } from "express";

import pool from "../../database";

class IngredientsControllers {
    
    //Get list
    public async listIngredients (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name, amount FROM ingredients WHERE active = true;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listIngredientsInProducts (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT * FROM detailProductsIngredients;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Get one
    public async getOneIngredient (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT id, name, amount FROM ingredients WHERE id = ? AND active = true;", [id])
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
        
        (await pool).query("SELECT * FROM detailProductsIngredients WHERE idProduct = ?", [id])
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Post
    public async createIngredient (req: Request, res: Response): Promise<void> {
        
        (await pool).query("INSERT INTO ingredients SET ?", [req.body]);
        res.status(200).json({ message: "Saved ingredient." });        
    }

    public async createIngredientInProduct (req: Request, res: Response): Promise<void> {        
        (await pool).query("INSERT INTO detailProductsIngredients SET ?", [req.body]);
        res.status(200).json({ message: "Saved ingredient in product." });
    }

    //Update
    public async updateIngredient (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE ingredients SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ message: "Ingredient updated successfully." });
    }

    public async updateIngredientInProduct (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE detailProductsIngredients SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ message: "Ingredient in product updated successfully." });
    }

    public async updateAmountIngredients (req: Request, res: Response): Promise<void>  {
        
        var ids = req.body;
        
        for(let x = 0; x < ids.length; x++) {

            await (await pool).query("SELECT idIngredient, spendingAmount FROM detailProductsIngredients WHERE idProduct = ?", [ids[x]])
                    .then(async (dates) => {
                        
                        const ingredientsInProduct = dates;                        
                        
                        for(var i = 0; i < ingredientsInProduct.length; i++) {
                            
                            let spendingAmount = ingredientsInProduct[i].spendingAmount;
                            let idIngredient = ingredientsInProduct[i].idIngredient;

                            await (await pool).query("SELECT amount FROM ingredients WHERE id = ? AND active = true;", [idIngredient])
                                        .then(async (date) => {
                                            
                                            let newAmount = date[0].amount - spendingAmount;                                                                                                                                                                            
                                            
                                            await (await pool).query("UPDATE ingredients SET amount = ? WHERE id = ?", [newAmount, idIngredient])
                                        });                        
                        }
                        
                    });
        }
        res.status(200).json({ message: "Ingredients amount updated successfully." });
    }

    //Delete
    public async deleteIngredient (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("UPDATE ingredients SET active = false WHERE id = ?", [id]);
        res.status(200).json({ message: "Ingredient eliminated successfully." });
    }

    public async deleteIngredientInProduct (req: Request, res: Response): Promise<void> {
        const { idProduct, idIngredient } = req.params;
        (await pool).query("UPDATE detailProductsIngredients SET active = false WHERE idProduct = ? AND idIngredient = ?", [idProduct, idIngredient]);
        res.status(200).json({ message: "Ingredient in product eliminated successfully." });
    }
}

export const ingredientsControllers = new IngredientsControllers();