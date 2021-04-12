import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';
import fs from 'fs-extra';

import pool from '../../../database';
import { Company } from '../../companies/models';

export const multerConfigProducts: multer.Multer = multer({
	storage: multer.diskStorage({
		destination: async (request, file, callback): Promise<void> => {
			const idCompany: number = request.user.idCompany;

			const company: Company = (
				await (await pool).query('SELECT name FROM company WHERE id = ?', [idCompany])
			)[0];

			if (typeof company == 'undefined') callback(new Error('Company not found.'), '');

			const dir: string = `uploads/${company.name}/products`.replace(/ /g, '_');
			const dirExists = await fs.pathExists(dir);

			if (!dirExists) {
				return await fs.mkdir(dir, { recursive: true }, (error: Error) => {
					return callback(error, dir);
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
