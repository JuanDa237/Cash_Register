import { Request, Response } from "express";
import pool from "../../database";

class CompaniesControllers {

    //Get one
    public async getOneCompany (req: Request, res: Response): Promise<void> {
        (await pool).query("SELECT name, imageUrl, ticketMessage FROM companies WHERE id = ? AND active = true;", [req.user.idCompany])
                    .then(dates => {
                        if(dates != 0) {
                            return res.status(200).json(dates);
                        }
                        else {
                            return res.status(404).json({ message: "Not found" });
                        }
                    });
    }
}

export const companiesControllers = new CompaniesControllers();