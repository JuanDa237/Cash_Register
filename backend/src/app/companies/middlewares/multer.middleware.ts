import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';
import fs from 'fs-extra';

import pool from '../../../database';

// Models
import { Company } from '../models';

export const multerConfig: multer.Multer = multer({
	storage: multer.diskStorage({
		destination: async (request, file, callback): Promise<void> => {
			const company: Company[] = await (
				await pool
			).query('SELECT name FROM companies WHERE id = ? AND active = true;', [
				request.user.idCompany
			]);

			if (company.length <= 0) return callback(new Error('Company not found.'), 'uploads');

			const dir: string = `uploads/${company[0].name}`.replace(/ /g, '_');
			const dirExists = await fs.pathExists(dir);

			if (!dirExists) {
				return await fs.mkdir(dir, (error: Error) => {
					callback(error, dir);
				});
			}

			return callback(null, dir);
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
	// Limits size here in bytes
});
