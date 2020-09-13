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

    private apiUri: string;
    private headers: HttpHeaders;

    constructor (
        private http: HttpClient
    ) {
    this.headers = new HttpHeaders().set("Content-type", "application/json");
    this.apiUri = url;
    }

    //Get Interval
    getTicketsInInterval(since: string, until: string): Observable<any> {
        return this.http.get(this.apiUri + "tickets/" + since + "/" + until, { headers: this.headers});
    }

    getTicketsInYear(): Observable<any> {
        return this.http.get(this.apiUri + "tickets/year", { headers: this.headers});
    }

    //Get List
    getTickets(): Observable<any> {
        return this.http.get(this.apiUri + "tickets", { headers: this.headers});
    }

    getProductsInTickets(): Observable<any> {
        return this.http.get(this.apiUri + "tickets/products", { headers: this.headers});
    }

    //Get One
    getProductsInTicket(id: number): Observable<any> {
        return this.http.get(this.apiUri + "ticket/products/" + id, { headers: this.headers});
    }

    //Post
    saveTicket(newTicket: Ticket): Observable<any> {
        let params = JSON.stringify(newTicket);
        return this.http.post(this.apiUri + "ticket", params, { headers: this.headers});
    }

    createProductInTicket(productInTicket: ProductInTicket): Observable<any> {
        var params = JSON.stringify(productInTicket);
        return this.http.post(this.apiUri + "ticket/product", params, { headers: this.headers});
    }
}