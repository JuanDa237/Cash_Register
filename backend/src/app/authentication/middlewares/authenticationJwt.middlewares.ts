import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../../../database";

import { User } from "../../users/models";
import { roles } from "../../roles/data";

interface Payload {
    id: number;
    iat: number;
    exp: number;
}

export async function verifyToken(request: Request, response: Response, next: NextFunction) {
    
    try {
        const token = request.header("Authorization")?.split(" ")[1];
    
        if(!token) 
            return response.status(403).json({ message: "No token provided." });
    
        const payload: Payload = jwt.verify(token, process.env.TOKEN_SECRET || "tokentest") as Payload;
        
        (await pool).query("SELECT idCompany, idRole, userName FROM users WHERE id = ?", [payload.id])
                    .then((dates: Array<User>) => {

                        if(dates.length > 0) {
                            
                            request.user = dates[0];
                            return next();
                        }
                        else {
                            return response.status(404).json({ message: "User not found." });
                        }
                    });

    } catch (error) {
        return response.status(401).json({ message: "Unauthorized." });
    }
}

export async function isCashier(request: Request, response: Response, next: NextFunction): Promise<void> {
    
    (await pool).query("SELECT name FROM roles WHERE id = ?", [request.user.idRole])
                .then((date: Array<any>) => {
                    
                    if(date.length > 0 && (date[0].name == roles.ADMINISTRATOR || date[0].name == roles.CASHIER)) {
                        return next();
                    }
                    else {
                        return response.status(401).json({ message: "Unauthorized."});
                    }
                });
}

export async function isAdministrator(request: Request, response: Response, next: NextFunction): Promise<void> {
    
    (await pool).query("SELECT name FROM roles WHERE id = ?", [request.user.idRole])
                .then((date: Array<any>) => {
                    
                    if(date.length > 0 && date[0].name == roles.ADMINISTRATOR) {
                        return next();
                    }
                    else {
                        return response.status(401).json({ message: "Unauthorized."});
                    }
                });
}