import { Request, Response } from "express";

import pool from "../../database";

class TicketsControllers {

    //Get Interval
    public async listTicketsInInterval (req: Request, res: Response): Promise<void> {
        const { since, until } = req.params;
        (await pool).query("SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE creationDate >= ? AND creationDate <= ? AND idCompany = ?", [since, until, req.user.idCompany])
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listTicketsInYear (req: Request, res: Response): Promise<void> {
        
        var year: number = new Date().getFullYear();

        (await pool).query("SELECT DATE_FORMAT(creationDate, '%m') AS creationDate, total, homeDelivery FROM tickets WHERE creationDate >= '?-01-01' AND creationDate <= '?-12-31' AND idCompany = ?", [year, year, req.user.idCompany])
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }
    
    //Get list
    public async listTickets (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE idCompany = ?", [req.user.idCompany])
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    public async listProductsInTickets (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT * FROM productsInTickets WHERE idCompany = ?", [req.user.idCompany])
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Get one
    public async getOneTicket (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE id = ? AND idCompany = ?", [id, req.user.idCompany])
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
        (await pool).query("SELECT * FROM productsInTickets WHERE idTicket = ? AND idCompany = ?", [id, req.user.idCompany])
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
    public async createTicket (req: Request, res: Response): Promise<void> {
        req.body.idCompany = req.user.idCompany;
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
        req.body.idCompany = req.user.idCompany;
        (await pool).query("INSERT INTO productsInTickets SET ?", [req.body]);
        res.status(200).json({ message: "Saved product in ticket." });        
    }
}

export const ticketsControllers = new TicketsControllers();