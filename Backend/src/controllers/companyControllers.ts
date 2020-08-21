import { Request, Response } from "express";

import pool from "../database";

class CompanyController {
    
    //Get list

    public async listCategories (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT _id, name FROM categories WHERE active = true;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listProducts (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT _id, name, price FROM products WHERE active = true;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listIngredients (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT _id, name, amount FROM ingredients WHERE active = true;")
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

    public async listClients (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT _id, name, domicile, address, phoneNumber FROM products WHERE active = true;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listTickets (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT _id, id_client, total, date  FROM tickets;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listProductsInTickets (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT * FROM detail_ticket_products;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Get one

    public async getOneCategory (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT _id, name FROM categories WHERE _id = ? AND active = true;", [id])
                    .then(dates => {
                        if(dates != 0) {
                            return res.status(200).json(dates);
                        }
                        else {
                            return res.status(404).json({ message: "Not found" });
                        }
                    });
    }

    public async getOneProduct (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT _id, name, price FROM products WHERE _id = ? AND active = true;", [id])
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
        (await pool).query("SELECT _id, name, amount FROM ingredients WHERE _id = ? AND active = true;", [id])
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
        
        (await pool).query("SELECT * FROM detail_products_ingredients WHERE id_product = ?", [id])
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async getOneClient (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT _id, name, domicile, address, phoneNumber FROM clients WHERE _id = ? AND active = true;", [id])
                    .then(dates => {
                        if(dates != 0) {
                            return res.status(200).json(dates);
                        }
                        else {
                            return res.status(404).json({ message: "Not found" });
                        }
                    });
    }

    public async getOneTicket (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT _id, id_client, total, date FROM tickets WHERE _id = ? AND active = true;", [id])
                    .then(dates => {
                        if(dates != 0) {
                            return res.status(200).json(dates);
                        }
                        else {
                            return res.status(404).json({ message: "Not found" });
                        }
                    });
    }

    public async getProductsInTicket (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT * FROM detail_ticket_products WHERE _id = ? AND active = true;", [id])
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
        
        (await pool).query("INSERT INTO categories SET ?", [req.body]);
        res.status(200).json({ message: "Saved category." });        
    }

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

    public async createClient (req: Request, res: Response): Promise<void> {
        
        (await pool).query("INSERT INTO clients SET ?", [req.body]);
        res.status(200).json({ message: "Saved client." });        
    }

    public async createTicket (req: Request, res: Response): Promise<void> {
        
        (await pool).query("INSERT INTO tickets SET ?", [req.body]);
        res.status(200).json({ message: "Saved ticket." });       
    }

    public async createProductInTicket (req: Request, res: Response): Promise<void> {
        
        (await pool).query("INSERT INTO detail_ticket_products SET ?", [req.body]);
        res.status(200).json({ message: "Saved product in ticket." });        
    }

    //Update

    public async updateCategory (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE catefories SET ? WHERE _id = ?", [req.body, id]);
        res.status(200).json({ message: "Category updated successfully." });
    }

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

    public async updateIngredientInProduct (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE detail_products_ingredients SET ? WHERE _id = ?", [req.body, id]);
        res.status(200).json({ message: "Ingredient in product updated successfully." });
    }

    public async updateAmountIngredients (req: Request, res: Response): Promise<void>  {
        
        var ids = req.body;
        
        for(let x = 0; x < ids.length; x++) {

            await (await pool).query("SELECT id_ingredient, spendingAmount FROM detail_products_ingredients WHERE id_product = ?", [ids[x]])
                    .then(async (dates) => {
                        
                        const ingredientsInProduct = dates;                        
                        
                        for(var i = 0; i < ingredientsInProduct.length; i++) {
                            
                            let spendingAmount = ingredientsInProduct[i].spendingAmount;
                            let idIngredient = ingredientsInProduct[i].id_ingredient;

                            await (await pool).query("SELECT amount FROM ingredients WHERE _id = ? AND active = true;", [idIngredient])
                                        .then(async (date) => {
                                            
                                            let newAmount = date[0].amount - spendingAmount;                                                                                                                                                                            
                                            
                                            await (await pool).query("UPDATE ingredients SET amount = ? WHERE _id = ?", [newAmount, idIngredient])                                                     
                                        });                        
                        }
                        
                    });                                    
        }
        res.status(200).json({ message: "Ingredients amount updated successfully." });
    }

    public async updateClient (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE clients SET ? WHERE _id = ?", [req.body, id]);
        res.status(200).json({ message: "Client updated successfully." });
    }

    //Tickets and relations can't update

    //Delete

    public async deleteCategory (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("UDATE categories SET active = false WHERE _id = ?", [id]);
        res.status(200).json({ message: "Category eliminated successfully." });
    }
    
    public async deleteProduct (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("UDATE products SET active = false WHERE _id = ?", [id]);
        res.status(200).json({ message: "Product eliminated successfully." });
    }

    public async deleteIngredient (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("UPDATE ingredients SET active = false WHERE _id = ?", [id]);
        res.status(200).json({ message: "Ingredient eliminated successfully." });
    }

    public async deleteIngredientInProduct (req: Request, res: Response): Promise<void> {
        const { id_product, id_ingredient } = req.params;
        (await pool).query("DELETE FROM detail_products_ingredients WHERE id_product = ? AND id_ingredient = ?", [id_product, id_ingredient]);
        res.status(200).json({ message: "Ingredient in product eliminated successfully." });
    }

    public async deleteClient (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("UDATE client SET active = false WHERE _id = ?", [id]);
        res.status(200).json({ message: "Client eliminated successfully." });
    }
}

export const companyController = new CompanyController();