import pool from "../../database";
import { encryptPassword } from "../users/models";

import { roles } from "./data";
import { User } from "../users/models/index";

export function createInitialData() {
    //Create initial roles
    createRoles().then(() => {
        //Create initial company and user
        createFirstCompany();
    });
}

const firstCompany = {
    name: "Del Perrero",
    imageUrl: "",
    ticketMessage: "",
    active: true
}

const firstUser = {
    name: "Juan David Gavira",
    userName: "Juan",
    password: "contra"
}

async function createRoles(): Promise<any> {

    await (await pool).query("SELECT * FROM roles;")
                .then(async (dates: Array<any>) => {
                    
                    try {
                        if(dates.length > 0)
                            return;

                        await Promise.all([
                            await (await pool).query(`INSERT INTO roles SET name = '${roles.USER}'`),
                            await (await pool).query(`INSERT INTO roles SET name = '${roles.CASHIER}'`),
                            await (await pool).query(`INSERT INTO roles SET name = '${roles.ADMINISTRATOR}'`)
                        ]);
                        console.log("Roles created.");
                    } catch (error) {
                        console.error(error);
                    }
                });
}

async function createFirstCompany(): Promise<any> {

    (await pool).query("SELECT * FROM companies;")
                    .then(async (dates: Array<any>) => {
                        
                        try {
                            if(dates.length > 0)
                                return;
    
                            (await pool).query("INSERT INTO companies SET ?", [firstCompany])
                                        .then(async company => {

                                            (await pool).query(`SELECT id FROM roles WHERE name = '${roles.ADMINISTRATOR}';`)
                                                        .then(async (roles: any[]) => {

                                                            const newUser: User = {
                                                                idCompany: company.insertId,
                                                                idRole: roles[0].id,
                                                                userName: firstUser.userName,
                                                                password: await encryptPassword(firstUser.password),
                                                                name: firstUser.name
                                                            };
                                                            
                                                            await (await pool).query("INSERT INTO users SET ?", [newUser]);
                                                            console.log("Company and user created.");
                                                        })
                                        });
                        } catch (error) {
                            console.error(error);
                        }
                    });
}