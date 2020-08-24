import { Request, Response } from "express";

import pool from "../../database";

class ClientsControllers {
    //Get All List
    public async listAllClients (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name, address, phoneNumber FROM clients;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }
    
    //Get List
    public async listClients (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT id, name, address, phoneNumber FROM clients WHERE active = true;")
                    .then(dates => {
                        res.status(200).json(dates);
                    });
    }

    //Get One
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
        const { id } = req.params;
        (await pool).query("UPDATE clients SET active = false WHERE id = ?", [id]);
        res.status(200).json({ message: "Client eliminated successfully." });
    }
}

export const clientsControllers = new ClientsControllers();