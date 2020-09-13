import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { url } from "../../../../services/global";

import { Product } from "../../models/product";
import { IngredientInProduct } from "../../../ingredients/models/ingredientInProduct";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private apiUri: string;
    private headers: HttpHeaders;

    constructor (
        private http: HttpClient
    ) {
    this.headers = new HttpHeaders().set("Content-type", "application/json");
    this.apiUri = url;
    }

    //Get All List
    getAllProducts(): Observable<any> {
        return this.http.get(this.apiUri + "all/products", { headers: this.headers});
    }

    getIngredientsInProducts(): Observable<any> {
        return this.http.get(this.apiUri + "products/ingredients", { headers: this.headers});
    }
    
    //Get List
    getProducts(): Observable<any> {
        return this.http.get(this.apiUri + "products", { headers: this.headers});
    }
    
    //Get One
    getProduct(id: number): Observable<any> {
        return this.http.get(this.apiUri + "product/" + id, { headers: this.headers});
    }

    getIngredientsInProduct(id: number): Observable<any> {
        return this.http.get(this.apiUri + "product/ingredients/" + id, { headers: this.headers});
    }
    
    //Post
    saveProduct(newProduct: Product): Observable<any> {
        let params = JSON.stringify(newProduct);
        return this.http.post(this.apiUri + "product", params, { headers: this.headers});
    }

    createIngredientInProduct(ingredientInProduct: IngredientInProduct): Observable<any> {
        var params = JSON.stringify(ingredientInProduct);
        return this.http.post(this.apiUri + "product/ingredient", params, { headers: this.headers});
    }
    
    //Update
    updateProduct(product: Product): Observable<any> {
        var params = JSON.stringify(product);
        return this.http.put(this.apiUri + "product/" + product.id, params, { headers: this.headers});
    }

    updateIngredientInProduct(ingredientInProduct: IngredientInProduct): Observable<any> {
        var params = JSON.stringify(ingredientInProduct);
        return this.http.put(this.apiUri + "product/ingredient/" + ingredientInProduct.id, params, { headers: this.headers});
    }

    updateAmountIngredients(ids: Array<number>): Observable<any> {
        var params = JSON.stringify(ids);
        return this.http.put(this.apiUri + "amountIngredients", params, { headers: this.headers});
    }

    //Delete
    deleteProduct(id: number): Observable<any> {
        return this.http.delete(this.apiUri + "product/" + id, { headers: this.headers});
    }

    deleteIngredientInProduct(id: number): Observable<any> {
        return this.http.delete(this.apiUri + "product/ingredient/" + id, { headers: this.headers});
    }
}