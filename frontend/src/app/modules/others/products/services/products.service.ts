import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

//Api
import { environment } from '@enviroment/environment';

import { Product } from "../models/index";
import { IngredientInProduct } from "../../ingredients/models/index";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private apiUrl: string;
    private headers: HttpHeaders;

    constructor (
        private http: HttpClient
    ) {
    this.headers = new HttpHeaders().set("Content-type", "application/json");
    this.apiUrl = environment.apiUrl;
    }

    //Get All List
    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl + "all/products", { headers: this.headers});
    }

    getIngredientsInProducts(): Observable<IngredientInProduct[]> {
        return this.http.get<IngredientInProduct[]>(this.apiUrl + "products/ingredients", { headers: this.headers});
    }
    
    //Get List
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl + "products", { headers: this.headers});
    }
    
    //Get One
    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + "product/" + id, { headers: this.headers});
    }

    getIngredientsInProduct(id: number): Observable<IngredientInProduct[]> {
        return this.http.get<IngredientInProduct[]>(this.apiUrl + "product/ingredients/" + id, { headers: this.headers});
    }
    
    //Post
    saveProduct(newProduct: Product): Observable<any> {
        let params = JSON.stringify(newProduct);
        return this.http.post(this.apiUrl + "product", params, { headers: this.headers});
    }

    createIngredientInProduct(ingredientInProduct: IngredientInProduct): Observable<any> {
        var params = JSON.stringify(ingredientInProduct);
        return this.http.post(this.apiUrl + "product/ingredient", params, { headers: this.headers});
    }
    
    //Update
    updateProduct(product: Product): Observable<any> {
        var params = JSON.stringify(product);
        return this.http.put(this.apiUrl + "product/" + product.id, params, { headers: this.headers});
    }

    updateIngredientInProduct(ingredientInProduct: IngredientInProduct): Observable<any> {
        var params = JSON.stringify(ingredientInProduct);
        return this.http.put(this.apiUrl + "product/ingredient/" + ingredientInProduct.id, params, { headers: this.headers});
    }

    updateAmountIngredients(ids: Array<number>): Observable<any> {
        var params = JSON.stringify(ids);
        return this.http.put(this.apiUrl + "amountIngredients", params, { headers: this.headers});
    }

    //Delete
    deleteProduct(id: number): Observable<any> {
        return this.http.delete(this.apiUrl + "product/" + id, { headers: this.headers});
    }

    deleteIngredientInProduct(id: number): Observable<any> {
        return this.http.delete(this.apiUrl + "product/ingredient/" + id, { headers: this.headers});
    }
}