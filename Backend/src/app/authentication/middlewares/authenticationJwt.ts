import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../../../database";

import { User } from "../../users/models/User";

interface Payload {
    id: number;
    iat: number;
    exp: number;
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    
    try {
        const token = req.header("authentication-token");

        if(!token) return res.status(403).json({ message: "No token provided."});

        const payload = jwt.verify(token, process.env.TOKEN_SECRET || "tokentest") as Payload;

        (await pool).query("SELECT idCompany, idRole, userName FROM users WHERE id = ?", [payload.id])
                    .then((dates: Array<User>) => {

                        if(dates.length > 0) {
                            
                            req.user = dates[0];
                            next();
                        }
                        else {
                            return res.status(404).json({ message: "User not found."});
                        }
                    })

    } catch (error) {
        return res.status(400).json({ message: "Unauthorized."});
    }
}

export async function isUser(req: Request, res: Response, next: NextFunction) {

    (await pool).query("SELECT name FROM roles WHERE id = ?", [req.user.idRole])
                .then((date: Array<any>) => {
                    
                    if(date.length > 0 && (date[0].name == "administrator" || date[0].name == "cashier" || date[0].name == "user")) {
                        next();
                    }
                    else {
                        return res.status(400).json({ message: "Unauthorized."});
                    }
                });
}

export async function isAdministrator(req: Request, res: Response, next: NextFunction) {
    
    (await pool).query("SELECT name FROM roles WHERE id = ?", [req.user.idRole])
                .then((date: Array<any>) => {
                    
                    if(date.length > 0 && date[0].name == "administrator") {
                        next();
                    }
                    else {
                        return res.status(400).json({ message: "Unauthorized."});
                    }
                });
}

export async function isCashier(req: Request, res: Response, next: NextFunction) {
    
    (await pool).query("SELECT name FROM roles WHERE id = ?", [req.user.idRole])
                .then((date: Array<any>) => {
                    
                    if(date.length > 0 && (date[0].name == "administrator" || date[0].name == "cashier")) {
                        next();
                    }
                    else {
                        return res.status(400).json({ message: "Unauthorized."});
                    }
                });
}