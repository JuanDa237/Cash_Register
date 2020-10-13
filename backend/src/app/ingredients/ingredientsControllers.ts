import { Request, Response } from "express";

import pool from "../../database";

class IngredientsControllers {
    
    //Get list
    public async listIngredients(request: Request, response: Response): Promise<Response> {
        return (await pool).query("SELECT id, name, amount, priceByUnit FROM ingredients WHERE active = true AND idCompany = ?", [request.user.idCompany])
                    .then(dates => {
                        return response.status(200).json(dates);
                    });
    }

    //Get one
    public async getOneIngredient(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        return (await pool).query("SELECT id, name, amount, priceByUnit FROM ingredients WHERE id = ? AND active = true AND idCompany = ?", [id, request.user.idCompany])
                    .then((dates: Array<any>) => {
                        
                        if(dates.length != 0) {
                            return response.status(200).json(dates[0]);
                        }
                        else {
                            return response.status(404).json({ message: "Not found" });
                        }
                    });
    }

    //Post
    public async createIngredient(request: Request, response: Response): Promise<Response> {
        request.body.idCompany = request.user.idCompany;
        return (await pool).query("INSERT INTO ingredients SET ?", [request.body])
                        .then(value => {
                            return response.status(200).json({ message: "Saved ingredient." });
                        });
    }

    //Update
    public async updateIngredient(request: Request, response: Response): Promise<Response>  {
        const { id } = request.params;
        return (await pool).query("UPDATE ingredients SET ? WHERE id = ?", [request.body, id])
                            .then(value => {
                                return response.status(200).json({ message: "Ingredient updated successfully." });
                            });
    }

    public async updateAmountIngredients(request: Request, response: Response): Promise<Response>  {
        
        var ids = request.body;
        const idCompany = request.user.idCompany;
        
        for(let x = 0; x < ids.length; x++) {

            await (await pool).query("SELECT idIngredient, spendingAmount FROM detailProductsIngredients WHERE idProduct = ? AND idCompany = ?", [ids[x], idCompany])
                    .then(async (dates) => {
                        
                        const ingredientsInProduct = dates;                        
                        
                        for(var i = 0; i < ingredientsInProduct.length; i++) {
                            
                            let spendingAmount = ingredientsInProduct[i].spendingAmount;
                            let idIngredient = ingredientsInProduct[i].idIngredient;

                            await (await pool).query("SELECT amount FROM ingredients WHERE id = ? AND active = true AND idCompany = ?", [idIngredient, idCompany])
                                        .then(async (date) => {
                                            
                                            let newAmount = date[0].amount - spendingAmount;                                                                                                                                                                            
                                            
                                            await (await pool).query("UPDATE ingredients SET amount = ? WHERE id = ?", [newAmount, idIngredient]);
                                        });                        
                        }
                        
                    });
        }
        return response.status(200).json({ message: "Ingredients amount updated successfully." });
    }

    //Delete
    public async deleteIngredient (request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        return (await pool).query("UPDATE ingredients SET active = false WHERE id = ?", [id])
                    .then(value => {
                        return response.status(200).json({ message: "Ingredient eliminated successfully." });
                    });
    }
}

export const ingredientsControllers = new IngredientsControllers();