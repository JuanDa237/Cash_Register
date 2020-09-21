import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { url } from "../../../../services/global";

import { Client } from "../../models/client";

@Injectable({
    providedIn: 'root'
})
export class ClientsService {

    private apiUri: string;
    private headers: HttpHeaders;

    constructor (
        private http: HttpClient
    ) {
    this.headers = new HttpHeaders().set("Content-type", "application/json");
    this.apiUri = url;
    }

    //Get Interval
    getNewClientsInYear(): Observable<any> {
        return this.http.get<Array<Client>>(this.apiUri + "clients/year", { headers: this.headers});
    }

    //Get All List
    getAllClients(): Observable<any> {
        return this.http.get<Array<Client>>(this.apiUri + "all/clients", { headers: this.headers});
    }

    //Get List
    getClients(): Observable<any> {
        return this.http.get<Array<Client>>(this.apiUri + "clients", { headers: this.headers});
    }

    //Post
    saveClient(newClient: Client): Observable<any> {
        let params = JSON.stringify(newClient);
        return this.http.post(this.apiUri + "client", params, { headers: this.headers});
    }

    //Update
    updateClient(client: Client): Observable<any> {
        var params = JSON.stringify(client);
        return this.http.put(this.apiUri + "client/" + client.id, params, { headers: this.headers});
    }

    //Delete
    deleteClient(id: number): Observable<any> {
        return this.http.delete(this.apiUri + "client/" + id, { headers: this.headers});
    }
}