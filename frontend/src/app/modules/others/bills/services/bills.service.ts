import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Api
import { environment } from '@enviroment/environment';

import { Bill, BillWithProducts } from '../models/index';
import { ProductInBill } from '../../products/models/index';

@Injectable({
	providedIn: 'root'
})
export class BillsService {
	private apiUrl: string;
	private headers: HttpHeaders;

	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders().set('Content-type', 'application/json');
		this.apiUrl = environment.apiUrl;
	}

	// Get Interval
	getBillsInInterval(since: string, until: string): Observable<Bill[]> {
		return this.http.get<Bill[]>(this.apiUrl + 'bills/' + since + '/' + until, {
			headers: this.headers
		});
	}

	amountOfBillsInYear(): Observable<Bill[]> {
		return this.http.get<Bill[]>(this.apiUrl + 'bills/year', { headers: this.headers });
	}

	// Get One

	getBill(id: number): Observable<Bill> {
		return this.http.get<Bill>(this.apiUrl + 'bill/' + id, { headers: this.headers });
	}

	getProductsInBill(id: number): Observable<ProductInBill[]> {
		return this.http.get<ProductInBill[]>(this.apiUrl + 'bill/products/' + id, {
			headers: this.headers
		});
	}

	// Post
	saveBill(newBill: BillWithProducts): Observable<BillRes> {
		let params = JSON.stringify(newBill);
		return this.http.post<BillRes>(this.apiUrl + 'bill', params, { headers: this.headers });
	}

	// Delete
	deleteBill(id: number): Observable<any> {
		return this.http.delete(this.apiUrl + 'bill/' + id, { headers: this.headers });
	}
}

interface BillRes {
	message: string;
	bill: {
		id: number;
		total: number;
		idDay: number;
	};
}
