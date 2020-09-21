import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { url } from "../../../../services/global";

import { Category } from "../../models/category";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    private apiUri: string;
    private headers: HttpHeaders;

    constructor (
        private http: HttpClient
    ) {
    this.headers = new HttpHeaders().set("Content-type", "application/json");
    this.apiUri = url;
    }

    //Get List
    getCategories(): Observable<any> {
        return this.http.get<Array<Category>>(this.apiUri + "categories", { headers: this.headers});
    }

    //Get One
    getCategory(id: number): Observable<any> {
        return this.http.get<Category>(this.apiUri + "category/" + id, { headers: this.headers});
    }

    //Post
    saveCategory(newCategory: Category): Observable<any> {
        let params = JSON.stringify(newCategory);
        return this.http.post(this.apiUri + "category", params, { headers: this.headers});
    }

    //Update
    updateCategory(category: Category): Observable<any> {
        var params = JSON.stringify(category);
        return this.http.put(this.apiUri + "category/" + category.id, params, { headers: this.headers});
    }

    //Delete
    deleteCategory(id: number): Observable<any> {
        return this.http.delete(this.apiUri + "category/" + id, { headers: this.headers});
    }
}