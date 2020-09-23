import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { url } from "../../../../services/global";

import { Ticket } from "../../models/ticket";
import { ProductInTicket } from "../../../product/models/productInTicket";

@Injectable({
    providedIn: 'root'
})
export class TicketsService {

    private apiUrl: string;
    private headers: HttpHeaders;

    constructor (
        private http: HttpClient
    ) {
    this.headers = new HttpHeaders().set("Content-type", "application/json");
    this.apiUrl = url;
    }

    //Get Interval
    getTicketsInInterval(since: string, until: string): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.apiUrl + "tickets/" + since + "/" + until, { headers: this.headers});
    }

    getTicketsInYear(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.apiUrl + "tickets/year", { headers: this.headers});
    }

    //Get List
    getTickets(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.apiUrl + "tickets", { headers: this.headers});
    }

    getProductsInTickets(): Observable<ProductInTicket[]> {
        return this.http.get<ProductInTicket[]>(this.apiUrl + "tickets/products", { headers: this.headers});
    }

    //Get One
    getProductsInTicket(id: number): Observable<ProductInTicket[]> {
        return this.http.get<ProductInTicket[]>(this.apiUrl + "ticket/products/" + id, { headers: this.headers});
    }

    //Post
    saveTicket(newTicket: Ticket): Observable<any> {
        let params = JSON.stringify(newTicket);
        return this.http.post(this.apiUrl + "ticket", params, { headers: this.headers});
    }

    createProductInTicket(productInTicket: ProductInTicket): Observable<any> {
        var params = JSON.stringify(productInTicket);
        return this.http.post(this.apiUrl + "ticket/product", params, { headers: this.headers});
    }
}