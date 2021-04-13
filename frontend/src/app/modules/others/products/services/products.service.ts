import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Api
import { environment } from '@enviroment/environment';

import { Product, ProductIngredientsFile } from '../models/index';
import { IngredientInProduct } from '../../ingredients/models/index';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	private apiUrl: string;
	private headers: HttpHeaders;

	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders().set('Content-type', 'application/json');
		this.apiUrl = environment.apiUrl;
	}

	// Get List
	getProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(this.apiUrl + 'products', { headers: this.headers });
	}

	// Get One
	getProduct(id: number): Observable<Product> {
		return this.http.get<Product>(this.apiUrl + 'product/' + id, { headers: this.headers });
	}

	getIngredientsInProduct(id: number): Observable<IngredientInProduct[]> {
		return this.http.get<IngredientInProduct[]>(this.apiUrl + `product/${id}/ingredients`, {
			headers: this.headers
		});
	}

	// Post
	createProduct(product: ProductIngredientsFile): Observable<any> {
		var fd = new FormData();
		fd.append('idCategory', String(product.idCategory));
		fd.append('name', product.name);
		fd.append('price', String(product.price));
		fd.append('ingredients', JSON.stringify(product.ingredients));
		fd.append('description', product.description);

		if (product.imageFile) fd.append('image', product.imageFile, product.imageFile.name);

		return this.http.post(this.apiUrl + 'product', fd);
	}

	// Update
	updateProduct(product: ProductIngredientsFile): Observable<any> {
		var fd = new FormData();
		fd.append('idCategory', String(product.idCategory));
		fd.append('name', product.name);
		fd.append('price', String(product.price));
		fd.append('ingredients', JSON.stringify(product.ingredients));
		fd.append('description', product.description);

		if (product.imageFile) fd.append('image', product.imageFile, product.imageFile.name);

		return this.http.put(this.apiUrl + 'product/' + product.id, fd);
	}

	// Delete
	deleteProduct(id: number): Observable<any> {
		return this.http.delete(this.apiUrl + 'product/' + id, { headers: this.headers });
	}
}
