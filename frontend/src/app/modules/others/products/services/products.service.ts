import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Api
import { environment } from '@enviroment/environment';

import { Product, ProductWithIngredients } from '../models/index';
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

	// Get All List
	getAllProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(this.apiUrl + 'all/products', { headers: this.headers });
	}

	getIngredientsInProducts(): Observable<IngredientInProduct[]> {
		return this.http.get<IngredientInProduct[]>(this.apiUrl + 'products/ingredients', {
			headers: this.headers
		});
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
	createProduct(newProduct: ProductWithIngredients): Observable<any> {
		let params = JSON.stringify(newProduct);
		return this.http.post(this.apiUrl + 'product', params, { headers: this.headers });
	}

	// Update
	updateProduct(product: ProductWithIngredients): Observable<any> {
		var params = JSON.stringify(product);
		return this.http.put(this.apiUrl + 'product/' + product.id, params, {
			headers: this.headers
		});
	}

	// Delete
	deleteProduct(id: number): Observable<any> {
		return this.http.delete(this.apiUrl + 'product/' + id, { headers: this.headers });
	}
}
