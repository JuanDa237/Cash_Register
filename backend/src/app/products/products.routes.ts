import { Router } from 'express';

import { productsController } from './products.controllers';
import { authJwt } from '../auth/middlewares/index';

class ProductsRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get All List
		this.router.get(
			'/all/products',
			[authJwt.isAdministrator],
			productsController.listAllProducts
		);

		// Get list
		this.router.get('/products', [authJwt.isCashier], productsController.listProducts);
		this.router.get(
			'/products/ingredients',
			[authJwt.isAdministrator],
			productsController.listIngredientsInProducts
		);

		// Get one
		this.router.get(
			'/product/:id',
			[authJwt.isAdministrator],
			productsController.getOneProduct
		);
		this.router.get(
			'/product/:id/ingredients/',
			[authJwt.isCashier],
			productsController.getIngredientsInProduct
		);

		// Post
		this.router.post('/product', [authJwt.isAdministrator], productsController.createProduct);

		// Update
		this.router.put(
			'/product/:id',
			[authJwt.isAdministrator],
			productsController.updateProduct
		);

		// Delete
		this.router.delete(
			'/product/:id',
			[authJwt.isAdministrator],
			productsController.deleteProduct
		);
	}
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;
