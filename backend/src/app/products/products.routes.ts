import { Router } from 'express';

import { productsController } from './products.controllers';
import { authJwt } from '../auth/middlewares/index';
import { multerConfigProducts } from './middlewares';

class ProductsRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get list
		this.router.get('/products', [authJwt.isCashier], productsController.listProducts);

		// Get one
		this.router.get('/product/:id', [authJwt.isAdministrator], productsController.getProduct);
		this.router.get(
			'/product/:id/ingredients/',
			[authJwt.isAdministrator],
			productsController.getIngredientsInProduct
		);

		// Post
		this.router.post(
			'/product',
			[authJwt.isAdministrator, multerConfigProducts.single('image')],
			productsController.createProduct
		);

		// Update
		this.router.put(
			'/product/:id',
			[authJwt.isAdministrator, multerConfigProducts.single('image')],
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
