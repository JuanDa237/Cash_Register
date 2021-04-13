import { Request, Response } from 'express';

class IndexController {
	public index(request: Request, response: Response): Response {
		return response.status(200).json({
			message: `Welcome for the api to Cash Register!\nThe documentation is in folder sources/postman.`
		});
	}
}

export const indexController = new IndexController();
