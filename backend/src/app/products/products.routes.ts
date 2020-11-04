import { Router } from 'express';

import { productsController } from './products.controllers';
import { authenticationJwt } from '../authentication/middlewares/index';

class ProductsRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get All List
		this.router.get(
			'/all/products',
			[authenticationJwt.verifyToken, authenticationJwt.isAdministrator],
			productsController.listAllProducts
		);

		// Get list
		this.router.get(
			'/products',
			[authenticationJwt.verifyToken, authenticationJwt.isCashier],
			productsController.listProducts
		);
		this.router.get(
			'/products/ingredients',
			[authenticationJwt.verifyToken, authenticationJwt.isAdministrator],
			productsController.listIngredientsInProducts
		);

		// Get one
		this.router.get(
			'/product/:id',
			[authenticationJwt.verifyToken, authenticationJwt.isAdministrator],
			productsController.getOneProduct
		);
		this.router.get(
			'/product/:id/ingredients/',
			[authenticationJwt.verifyToken, authenticationJwt.isCashier],
			productsController.getIngredientsInProduct
		);

		// Post
		this.router.post(
			'/product',
			[authenticationJwt.verifyToken, authenticationJwt.isAdministrator],
			productsController.createProduct
		);

		// Update
		this.router.put(
			'/product/:id',
			[authenticationJwt.verifyToken, authenticationJwt.isAdministrator],
			productsController.updateProduct
		);

		// Delete
		this.router.delete(
			'/product/:id',
			[authenticationJwt.verifyToken, authenticationJwt.isAdministrator],
			productsController.deleteProduct
		);
	}
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;
