import { Request, Response } from "express";

import pool from "../../database";

class ClientsControllers {
    //Get Interval
    public async listClientsInYear (req: Request, res: Response): Promise<void> {
        
        var year: number = new Date().getFullYear();

        (await pool).query("SELECT DATE_FORMAT(creationDate, '%m') AS creationDate, active FROM clients WHERE creationDate >= '?-01-01' AND creationDate <= '?-12-31'", [year, year])
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Get All List
    public async listAllClients (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate FROM clients;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }
    
    //Get List
    public async listClients (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate FROM clients WHERE active = true;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Get One
    public async getOneClient (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        (await pool).query("SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate FROM clients WHERE id = ? AND active = true;", [id])
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
    public async createClient (req: Request, res: Response): Promise<void> {
        
        (await pool).query("INSERT INTO clients SET ?", [req.body]);
        res.status(200).json({ message: "Saved client." });        
    }

    //Update
    public async updateClient (req: Request, res: Response): Promise<void>  {
        const { id } = req.params;
        (await pool).query("UPDATE clients SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ message: "Client updated successfully." });
    }

    //Delete
    public async deleteClient (req: Request, res: Response): Promise<void> {

        var date: Date = new Date();
        var year: string, month: string, day: string;
    
        year = String(date.getFullYear());
        month = String(date.getMonth() + 1);
        day = String(date.getDate());
        
        if (month.length == 1) {
            month = "0" + month;
        }
        
        if (day.length == 1) {
            day = "0" + day;
        }
        
        const { id } = req.params;
        var newDate: string = year + "-" + month + "-" + day;

        (await pool).query("UPDATE clients SET active = false, creationDate = ? WHERE id = ?", [newDate, id]);
        res.status(200).json({ message: "Client eliminated successfully." });
    }
}

export const clientsControllers = new ClientsControllers();