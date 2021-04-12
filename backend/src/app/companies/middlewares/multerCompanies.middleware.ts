import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';
import fs from 'fs-extra';

export const multerConfigCompanies: multer.Multer = multer({
	storage: multer.diskStorage({
		destination: async (request, file, callback): Promise<void> => {
			const companyName: string = request.body.name;

			if (typeof companyName == 'undefined') callback(new Error('No provided name'), '');

			const dir: string = `uploads/${companyName}`.replace(/ /g, '_');
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
