import { Request, Response } from "express";

import pool from "../../database";

class UsersControllers {

    //Get logged user
    public async loggedUser(request: Request, response: Response): Promise<Response> {

        return (await pool).query("SELECT name, idRole FROM users WHERE id = ? AND active = true;", [request.user.id])
                        .then(async (value: any[]): Promise<Response> => {
                            
                            return (await pool).query("SELECT name FROM roles WHERE id = ?", [value[0].idRole])
                                            .then((roles: any[]): Response => {
                                                
                                                return response.status(200).json({
                                                    name: value[0].name,
                                                    role: roles[0].name
                                                });
                                            });
                        });
    }
}

export const usersControllers = new UsersControllers();