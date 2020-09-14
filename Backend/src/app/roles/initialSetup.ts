import pool from "../../database";

export async function createRoles() {

    (await pool).query("SELECT * FROM roles;")
                .then(async (dates: Array<any>) => {
                    
                    try {
                        if(dates.length > 0) return;

                        await Promise.all([
                            (await pool).query("INSERT INTO roles SET name = 'user'"),
                            (await pool).query("INSERT INTO roles SET name = 'administrator'"),
                            (await pool).query("INSERT INTO roles SET name = 'cashier'")
                        ]);
                    } catch (error) {
                        console.log(<any>error);
                    }
                })
}