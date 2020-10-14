import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import pool from "../../database";

import { User, encryptPassword, validatePassword } from "../users/models";
import { Role } from "../roles/models";

class AuthenticationControllers {
    
    //Post
    public async singIn(request: Request, response: Response): Promise<Response> {
        
        const { userName, password } = request.body;

        return (await pool).query("SELECT id, password FROM users WHERE userName = ?", [userName])
                    .then(async (dates: Array<any>): Promise<Response> => {
                        
                        if(dates.length != 0) {
                            
                            const correctPassword: boolean = await validatePassword(password, dates[0].password);

                            if(correctPassword) {

                                const token: string = jwt.sign({
                                    id: dates[0].id
                                }, process.env.TOKEN_SECRET || "tokenTest", {
                                    expiresIn: 86400 //The token expires in 24 hours
                                });
                                
                                return response.status(200).header("token", token).set('Access-Control-Expose-Headers', 'token').json({ message: "Sing in succesfully." });
                            }
                            else {
                                return response.status(401).json({ message: "Password is wrong." });
                            }
                        }
                        else {
                            return response.status(404).json({ message: "Username not found." });
                        }
                    });
    }
    
    public async singUp(request: Request, response: Response): Promise<Response> {
        
        const { idCompany, roleName, userName, password, name } = request.body;
        var idRole: number = 0;

        //Validate userName
        var usernameResponse: Response | undefined = await (await pool).query("SELECT id FROM users WHERE userName = ?", [userName])
                            .then((dates: Array<number>): Response | undefined => {
                                
                                if (dates.length > 0) {
                                    return response.status(401).json({ message: `Username "${userName}" is in use.` });
                                }
                            });

        if(typeof usernameResponse == "undefined") {

            //Validate role
            if(roleName != null) {
                var roleResponse: Response | undefined = await (await pool).query("SELECT * FROM roles WHERE name = ?", [roleName])
                            .then((dates: Array<Role>): Response | undefined => {
                                
                                if(dates.length > 0) {
                                    
                                    idRole = dates[0].id;
                                }
                                else {
                                    return response.status(400).json({ message: `Role "${roleName}" not found.` });
                                }
                            });
            }
            else {
                return response.status(400).json({ message: "No provided role." });
            }
    
            if(typeof roleResponse == "undefined") {

                const newUser: User = {
                    idCompany: idCompany,
                    idRole: idRole,
                    userName: userName,
                    password: await encryptPassword(password),
                    name: name
                };
                
                var userResponse: Promise<Response> = (await pool).query("INSERT INTO users SET ?", [newUser])
                            .then(async function(value: any): Promise<Response> {

                                var exportUser = {
                                    id: value.insertId,
                                    idCompany: newUser.idCompany,
                                    idRole: newUser.idRole,
                                    userName: newUser.userName,
                                    name: newUser.name
                                };

                                return response.status(200).json({
                                    message: "Saved user.",
                                    user: exportUser
                                });
                            });
                return userResponse;
            }
            else {
                return roleResponse;
            }
        }
        else {
            return usernameResponse;
        }
    }
}

export const authenticationControllers = new AuthenticationControllers();