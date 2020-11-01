import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';
import fs from 'fs-extra';

import pool from '../../../database';

export const multerConfig: multer.Multer = multer({
	storage: multer.diskStorage({
		destination: async (request, file, callback): Promise<void> => {
			(await pool)
				.query('SELECT name FROM companies WHERE id = ? AND active = true;', [
					request.user.idCompany
				])
				.then(async (dates: Array<any>) => {
					const category = dates[0];

					if (category != null || typeof category != 'undefined') {
						const dir: string = `uploads/${category.name}`.replace(/ /g, '_');
						const dirExists = await fs.pathExists(dir);

						if (!dirExists) {
							return await fs.mkdir(dir, (error: Error) => {
								callback(error, dir);
							});
						}

						return callback(null, dir);
					} else {
						return callback(new Error('Category not found.'), 'uploads');
					}
				});
		},
		filename: (request, file, callback): void => {
			const extencion: string = path.extname(file.originalname);

			if (extencion.match(/\.(jpg|jpeg|png|gif)$/)) {
				return callback(null, uuid() + extencion);
			} else {
				return callback(new Error(`No support '${extencion}' format`), '');
			}
		}
	})
	//Limits size here in bytes
});
