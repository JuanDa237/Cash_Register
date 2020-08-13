import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Product } from "../../models/product";
import { Ingredient } from "../../models/ingredient";
import { IngredientInProduct } from "../../models/ingredientInProduct";

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
    this.apiUri = "http://localhost:3000/api/";
  }

  //Get list
  getProducts(): Observable<any> {
    return this.http.get(this.apiUri + "products", { headers: this.headers});
  }

  getIngredients(): Observable<any> {
    return this.http.get(this.apiUri + "ingredients", { headers: this.headers});
  }

  getIngredientsInProducts(): Observable<any> {
    return this.http.get(this.apiUri + "products/ingredients", { headers: this.headers});
  }

  //Get one
  getProduct(id: number): Observable<any> {
    return this.http.get(this.apiUri + "product/" + id, { headers: this.headers});
  }

  getIngredient(id: number): Observable<any> {
    return this.http.get(this.apiUri + "ingredient/" + id, { headers: this.headers});
  }

  getIngredientsInProduct(id: number): Observable<any> {
    return this.http.get(this.apiUri + "product/ingredients/" + id, { headers: this.headers});
  }

  //Post
  saveProduct(newProduct: Product): Observable<any> {
    let params = JSON.stringify(newProduct);
    return this.http.post(this.apiUri + "product", params, { headers: this.headers});
  }
  
  saveIngredient(newIngredient: Ingredient): Observable<any> {
    let params = JSON.stringify(newIngredient);
    return this.http.post(this.apiUri + "ingredient", params, { headers: this.headers});
  }

  createIngredientInProduct(ingredientInProduct: IngredientInProduct): Observable<any> {
    var params = JSON.stringify(ingredientInProduct);
    return this.http.post(this.apiUri + "product/ingredient", params, { headers: this.headers});
  }

  //Update
  updateProduct(product: Product): Observable<any> {
    var params = JSON.stringify(product);
    return this.http.put(this.apiUri + "product/" + product._id, params, { headers: this.headers});
  }

  updateIngredient(ingredient: Ingredient): Observable<any> {
    var params = JSON.stringify(ingredient);
    return this.http.put(this.apiUri + "ingredient/" + ingredient._id, params, { headers: this.headers});
  }

  //Delete
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.apiUri + "product/" + id, { headers: this.headers});
  }

  deleteIngredient(id: number): Observable<any> {
    return this.http.delete(this.apiUri + "ingredient/" + id, { headers: this.headers});
  }

  deleteIngredientInProduct(id_product: number, id_ingredient: number): Observable<any> {
    return this.http.delete(this.apiUri + "product/" + id_product + "/" + id_ingredient, { headers: this.headers});
  }
}
