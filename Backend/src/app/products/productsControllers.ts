import { Request, Response } from "express";

import pool from "../../database";

class ProductsController {
    
    //Get All List
    public async listAllProducts(request: Request, response: Response): Promise<Response> {
        
        return (await pool).query("SELECT id, name, price FROM products WHERE idCompany = ?", [request.user.idCompany])
                    .then(dates => {
                        return response.status(200).json(dates);
                    });
    }

    //Get list

    public async listProducts(request: Request, response: Response): Promise<Response> {
        return (await pool).query("SELECT id, name, price FROM products WHERE active = true AND idCompany = ?", [request.user.idCompany])
                    .then(dates => {
                        return response.status(200).json(dates);
                    });
    }

    public async listIngredientsInProducts(request: Request, response: Response): Promise<Response> {
        
        return (await pool).query("SELECT id, idProduct, idIngredient, spendingAmount FROM detailProductsIngredients WHERE active = true AND idCompany = ?", [request.user.idCompany])
                    .then(dates => {
                        return response.status(200).json(dates);
                    });
    }

    //Get one
    public async getOneProduct(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        return (await pool).query("SELECT id, idCategory , name, price FROM products WHERE id = ? AND active = true AND idCompany = ?", [id, request.user.idCompany])
                    .then(dates => {
                        
                        if(dates != 0) {
                            return response.status(200).json(dates);
                        }
                        else {
                            return response.status(404).json({ message: "Not found" });
                        }
                    });
    }

    public async getIngredientsInProduct(request: Request, response: Response): Promise<Response> {
        
        const { id } = request.params;
        return (await pool).query("SELECT id, idProduct, idIngredient, spendingAmount FROM detailProductsIngredients WHERE idProduct = ? AND active = true AND idCompany = ?", [id, request.user.idCompany])
                    .then(dates => {
                        return response.status(200).json(dates);
                    });
    }

    //Post

    public async createProduct(request: Request, response: Response): Promise<Response> {
        request.body.idCompany = request.user.idCompany;
        return (await pool).query("INSERT INTO products SET ?", [request.body])
                    .then(async function(value: any) {

                        return response.status(200).json({
                            message: "Saved product.",
                            id: value.insertId
                        });
                    });
    }

    public async createIngredientInProduct(request: Request, response: Response): Promise<Response> {
        request.body.idCompany = request.user.idCompany;
        return (await pool).query("INSERT INTO detailProductsIngredients SET ?", [request.body])
                        .then(value => {
                            return response.status(200).json({ message: "Saved ingredient in product." });
                        });
    }

    //Update

    public async updateProduct(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        return (await pool).query("UPDATE products SET ? WHERE id = ?", [request.body, id])
                        .then(value => {
                            return response.status(200).json({ message: "Product updated successfully." });
                        });
    }

    public async updateIngredientInProduct(request: Request, response: Response): Promise<Response>  {
        const { id } = request.params;
        return (await pool).query("UPDATE detailProductsIngredients SET ? WHERE id = ?", [request.body, id])
                        .then(value => {
                            return response.status(200).json({ message: "Ingredient in product updated successfully." });
                        });
    }

    //Delete

    public async deleteProduct(request: Request, response: Response): Promise<Response> {
        
        const { id } = request.params;
        return (await pool).query("UPDATE products SET active = false WHERE id = ?", [id])
                        .then(value => {
                            return response.status(200).json({ message: "Product eliminated successfully." });
                        });
    }

    public async deleteIngredientInProduct(request: Request, response: Response): Promise<Response> {
        
        const { id } = request.params;
        return (await pool).query("UPDATE detailProductsIngredients SET active = false WHERE id = ?", [id])
                        .then(value => {
                            return response.status(200).json({ message: "Ingredient in product eliminated successfully." });
                        });
    }
}

export const productsController = new ProductsController();