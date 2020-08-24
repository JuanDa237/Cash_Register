import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { url } from "../global";

import { Ingredient } from "../../models/ingredient";

@Injectable({
    providedIn: 'root'
})
export class IngredientsService {

    private apiUri: string;
    private headers: HttpHeaders;

    constructor (
        private http: HttpClient
    ) {
    this.headers = new HttpHeaders().set("Content-type", "application/json");
    this.apiUri = url;
    }

    //Get List
    getIngredients(): Observable<any> {
        return this.http.get(this.apiUri + "ingredients", { headers: this.headers});
    }

    //Get One
    getIngredient(id: number): Observable<any> {
        return this.http.get(this.apiUri + "ingredient/" + id, { headers: this.headers});
    }

    //Post
    saveIngredient(newIngredient: Ingredient): Observable<any> {
        let params = JSON.stringify(newIngredient);
        return this.http.post(this.apiUri + "ingredient", params, { headers: this.headers});
    }

    //Update
    updateIngredient(ingredient: Ingredient): Observable<any> {
        var params = JSON.stringify(ingredient);
        return this.http.put(this.apiUri + "ingredient/" + ingredient.id, params, { headers: this.headers});
    }

    //Delete
    deleteIngredient(id: number): Observable<any> {
        return this.http.delete(this.apiUri + "ingredient/" + id, { headers: this.headers});
    }
}