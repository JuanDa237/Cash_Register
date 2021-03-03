import { Component, OnInit } from '@angular/core';

import { ClientsService } from '@app/modules/others/clients/services';
import { Client, createEmptyClient } from '@app/modules/others/clients/models';

import { Company, createEmptyCompany } from '@app/modules/others/companies/models';

import { BillsService } from '../../services';
import { Bill, createEmptyBill } from '../../models';

import { ProductInBill } from '@app/modules/others/products/models';

//Api
import { environment } from '@enviroment/environment';
import { UserDataService } from '@app/modules/main/navigation/services';

@Component({
	selector: 'app-bill-view',
	templateUrl: './bill-view.component.html'
})
export class BillViewComponent implements OnInit {
	public company: Company;
	public client: Client;
	public bill: Bill;

	public productsInBill: Array<ProductInBill>;

	public apiUrl: string;

	public messages: boolean;

	constructor(
		private billsService: BillsService,
		private clientsService: ClientsService,
		private userData: UserDataService
	) {
		this.productsInBill = new Array<ProductInBill>(0);
		this.bill = createEmptyBill();
		this.client = createEmptyClient();
		this.company = createEmptyCompany();
		this.messages = false;

		this.apiUrl = environment.apiUrl;
	}

	ngOnInit(): void {
		this.getCompany();
	}

	private getCompany() {
		this.company = this.userData.getCompany();
		this.userData.company$.subscribe((x) => (this.company = x));
	}

	private viewMessages(): void {
		for (const product of this.productsInBill) {
			if (!this.messages && typeof product.message != 'undefined') {
				this.messages = true;
			}
		}
	}

	// Parents methods
	public viewBill(id: number): void {
		this.billsService.getBill(id).subscribe(
			(response) => {
				this.bill = response;

				this.billsService.getProductsInBill(this.bill.id).subscribe(
					(response) => {
						this.productsInBill = response;
						this.viewMessages();
					},
					(error) => {
						throw new Error(error);
					}
				);

				this.clientsService.getClient(this.bill.idClient).subscribe(
					(response) => {
						this.client = response;
					},
					(error) => {
						throw new Error(error);
					}
				);
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public viewBill2(bill: Bill, client: Client): void {
		this.bill = bill;
		this.client = client;

		this.billsService.getProductsInBill(this.bill.id).subscribe(
			(response) => {
				this.productsInBill = response;
				this.viewMessages();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public viewBill3(bill: Bill, client: Client, products: ProductInBill[]): void {
		this.bill = bill;
		this.client = client;
		this.productsInBill = products;
		this.viewMessages();
	}
}
