import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { url } from "../../../../services/global";

import { Ingredient } from "../../models/ingredient";

@Injectable({
    providedIn: 'root'
})
export class IngredientsService {

    private apiUrl: string;
    private headers: HttpHeaders;

    constructor (
        private http: HttpClient
    ) {
    this.headers = new HttpHeaders().set("Content-type", "application/json");
    this.apiUrl = url;
    }

    //Get List
    getIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.apiUrl + "ingredients", { headers: this.headers});
    }

    //Get One
    getIngredient(id: number): Observable<Ingredient> {
        return this.http.get<Ingredient>(this.apiUrl + "ingredient/" + id, { headers: this.headers});
    }

    //Post
    saveIngredient(newIngredient: Ingredient): Observable<any> {
        let params = JSON.stringify(newIngredient);
        return this.http.post(this.apiUrl + "ingredient", params, { headers: this.headers});
    }

    //Update
    updateIngredient(ingredient: Ingredient): Observable<any> {
        var params = JSON.stringify(ingredient);
        return this.http.put(this.apiUrl + "ingredient/" + ingredient.id, params, { headers: this.headers});
    }

    //Delete
    deleteIngredient(id: number): Observable<any> {
        return this.http.delete(this.apiUrl + "ingredient/" + id, { headers: this.headers});
    }
}