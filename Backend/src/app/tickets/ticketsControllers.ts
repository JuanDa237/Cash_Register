import { Request, Response } from "express";

import pool from "../../database";

class TicketsControllers {

    //Get list
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
}

export const ticketsControllers = new TicketsControllers();