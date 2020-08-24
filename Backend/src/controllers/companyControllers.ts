import { Request, Response } from "express";

import pool from "../database";

class CompanyController {
    //Get All List
    public async listAllProducts (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name, price FROM products;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listAllClients (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name, address, phoneNumber FROM clients;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }
    
    //Get list

    public async listCategories (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name FROM categories WHERE active = true;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listProducts (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name, price FROM products WHERE active = true;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

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

    public async listClients (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name, address, phoneNumber FROM clients WHERE active = true;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listTickets (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, idClient, total, DATE_FORMAT(date, '%m-%d-%Y') AS date FROM tickets;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listProductsInTickets (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT * FROM detailTicketProducts;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Get one

    public async getOneCategory (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT id, name FROM categories WHERE id = ? AND active = true;", [id])
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

    public async getOneClient (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT id, name, domicile, address, phoneNumber FROM clients WHERE id = ? AND active = true;", [id])
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
        (await pool).query("SELECT id, idClient, total, date FROM tickets WHERE id = ? AND active = true;", [id])
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
        (await pool).query("SELECT * FROM detailTicketProducts WHERE id = ? AND active = true;", [id])
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

                        (await pool).query("SELECT id FROM products WHERE id=(SELECT max(id) FROM products);").then(dates => {
                            res.status(200).json({
                                message: "Saved product.",
                                id: dates
                            });
                        });
                    });
    }

    public async createIngredient (req: Request, res: Response): Promise<void> {
        
        (await pool).query("INSERT INTO ingredients SET ?", [req.body]);
        res.status(200).json({ message: "Saved ingredient." });        
    }

    public async createIngredientInProduct (req: Request, res: Response): Promise<void> {        
        (await pool).query("INSERT INTO detailProductsIngredients SET ?", [req.body]);
        res.status(200).json({ message: "Saved ingredient in product." });
    }

    public async createClient (req: Request, res: Response): Promise<void> {
        
        (await pool).query("INSERT INTO clients SET ?", [req.body]);
        res.status(200).json({ message: "Saved client." });        
    }

    public async createTicket (req: Request, res: Response): Promise<void> {
        
        (await pool).query("INSERT INTO tickets SET ?", [req.body])
                    .then(async function(value) {

                        (await pool).query("SELECT id FROM tickets WHERE id=(SELECT max(id) FROM tickets);")
                        .then(dates => {

                            res.status(200).json({
                                message: "Saved ticket.",
                                id: dates
                            });
                        });
                    });;    
    }

    public async createProductInTicket (req: Request, res: Response): Promise<void> {
        
        (await pool).query("INSERT INTO detailTicketProducts SET ?", [req.body]);
        res.status(200).json({ message: "Saved product in ticket." });        
    }

    //Update

    public async updateCategory (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE categories SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ message: "Category updated successfully." });
    }

    public async updateProduct (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE products SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ message: "Product updated successfully." });
    }

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

    public async updateClient (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE clients SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ message: "Client updated successfully." });
    }

    //Tickets and relations can't update

    //Delete

    public async deleteCategory (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("UPDATE categories SET active = false WHERE id = ?", [id]);
        res.status(200).json({ message: "Category eliminated successfully." });
    }
    
    public async deleteProduct (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("UPDATE products SET active = false WHERE id = ?", [id]);
        res.status(200).json({ message: "Product eliminated successfully." });
    }

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

    public async deleteClient (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("UPDATE clients SET active = false WHERE id = ?", [id]);
        res.status(200).json({ message: "Client eliminated successfully." });
    }
}

export const companyController = new CompanyController();