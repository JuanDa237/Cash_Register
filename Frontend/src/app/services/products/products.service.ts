import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Category } from "../../models/category";
import { Product } from "../../models/product";
import { Ingredient } from "../../models/ingredient";
import { IngredientInProduct } from "../../models/ingredientInProduct";
import { Client } from "../../models/client";
import { Ticket } from 'src/app/models/ticket';
import { ProductInTicket } from "../../models/productInTicket";

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

  //Get All List
  getAllProducts(): Observable<any> {
    return this.http.get(this.apiUri + "all/products", { headers: this.headers});
  }

  getAllClients(): Observable<any> {
    return this.http.get(this.apiUri + "all/clients", { headers: this.headers});
  }

  //Get list
  
  getCategories(): Observable<any> {
    return this.http.get(this.apiUri + "categories", { headers: this.headers});
  }
  
  getProducts(): Observable<any> {
    return this.http.get(this.apiUri + "products", { headers: this.headers});
  }

  getIngredients(): Observable<any> {
    return this.http.get(this.apiUri + "ingredients", { headers: this.headers});
  }

  getIngredientsInProducts(): Observable<any> {
    return this.http.get(this.apiUri + "products/ingredients", { headers: this.headers});
  }

  getClients(): Observable<any> {
    return this.http.get(this.apiUri + "clients", { headers: this.headers});
  }

  getTickets(): Observable<any> {
    return this.http.get(this.apiUri + "tickets", { headers: this.headers});
  }

  getProductsInTickets(): Observable<any> {
    return this.http.get(this.apiUri + "tickets/products", { headers: this.headers});
  }

  //Get one
  getCategory(id: number): Observable<any> {
    return this.http.get(this.apiUri + "category/" + id, { headers: this.headers});
  }

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
  saveCategory(newCategory: Category): Observable<any> {
    let params = JSON.stringify(newCategory);
    return this.http.post(this.apiUri + "category", params, { headers: this.headers});
  }

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

  saveClient(newClient: Client): Observable<any> {
    let params = JSON.stringify(newClient);
    return this.http.post(this.apiUri + "client", params, { headers: this.headers});
  }

  saveTicket(newTicket: Ticket): Observable<any> {
    let params = JSON.stringify(newTicket);
    return this.http.post(this.apiUri + "ticket", params, { headers: this.headers});
  }

  createProductInTicket(productInTicket: ProductInTicket): Observable<any> {
    var params = JSON.stringify(productInTicket);
    return this.http.post(this.apiUri + "ticket/product", params, { headers: this.headers});
  }

  //Update
  updateCategory(category: Category): Observable<any> {
    var params = JSON.stringify(category);
    return this.http.put(this.apiUri + "category/" + category._id, params, { headers: this.headers});
  }

  updateProduct(product: Product): Observable<any> {
    var params = JSON.stringify(product);
    return this.http.put(this.apiUri + "product/" + product._id, params, { headers: this.headers});
  }

  updateIngredient(ingredient: Ingredient): Observable<any> {
    var params = JSON.stringify(ingredient);
    return this.http.put(this.apiUri + "ingredient/" + ingredient._id, params, { headers: this.headers});
  }

  updateIngredientInProduct(ingredientInProduct: IngredientInProduct): Observable<any> {
    var params = JSON.stringify(ingredientInProduct);
    return this.http.put(this.apiUri + "product/ingredient/" + ingredientInProduct._id, params, { headers: this.headers});
  }

  updateAmountIngredients(ids: Array<number>): Observable<any> {
    var params = JSON.stringify(ids);    
    return this.http.put(this.apiUri + "amountIngredients", params, { headers: this.headers});
  }

  updateClient(client: Client): Observable<any> {
    var params = JSON.stringify(client);
    return this.http.put(this.apiUri + "client/" + client._id, params, { headers: this.headers});
  }

  //Delete
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.apiUri + "category/" + id, { headers: this.headers});
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.apiUri + "product/" + id, { headers: this.headers});
  }

  deleteIngredient(id: number): Observable<any> {
    return this.http.delete(this.apiUri + "ingredient/" + id, { headers: this.headers});
  }

  deleteIngredientInProduct(id_product: number, id_ingredient: number): Observable<any> {
    return this.http.delete(this.apiUri + "product/" + id_product + "/" + id_ingredient, { headers: this.headers});
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(this.apiUri + "client/" + id, { headers: this.headers});
  }
}
