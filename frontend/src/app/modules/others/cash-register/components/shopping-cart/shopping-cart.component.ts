import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

// Services
import { BillsService } from '@modules/others/bills/services';

// Models
import { Client, createEmptyClient } from '@modules/others/clients/models';
import { Product, ProductInBill } from '@modules/others/products/models';
import { ProductInCart } from '../../models';
import { BillViewComponent } from '@modules/others/bills/components';
import { BillWithProducts, ProductWithAmount, Bill } from '@app/modules/others/bills/models';

// Libs
import { Sweet } from '@modules/others/app-common/libs';
import { Company, createEmptyCompany } from '@app/modules/others/companies/models';
import { UserDataService } from '@app/modules/main/navigation/services';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
	public shoppingCart: ProductInCart[];
	public total: number;

	public doHomeDelivery: boolean;
	public homeDelivery: number | null;

	public company: Company;

	@ViewChild(BillViewComponent)
	public billChild!: BillViewComponent;

	@Input()
	public client: Client;

	@Output()
	public refreshPage: EventEmitter<null>;

	private sweet: Sweet;

	constructor(private billsService: BillsService, private userData: UserDataService) {
		this.shoppingCart = new Array<ProductInCart>(0);
		this.total = 0;
		this.doHomeDelivery = false;
		this.homeDelivery = null;
		this.company = createEmptyCompany();
		this.client = createEmptyClient();
		this.refreshPage = new EventEmitter<null>();
		this.sweet = new Sweet();
	}

	ngOnInit(): void {
		this.getCompany();
	}

	private getCompany(): void {
		this.company = this.userData.getCompany();
		this.userData.company$.subscribe((x) => (this.company = x));
	}

	// Parent methods
	public addProduct(product: Product): void {
		this.shoppingCart.push({
			product: {
				id: product.id,
				idCategory: product.idCategory,
				name: product.name,
				price: product.price
			},
			amount: 1,
			total: product.price,
			message: ''
		} as ProductInCart);

		this.actualizePrice();
	}

	// Html methods
	public deleteProduct(index: number): void {
		this.shoppingCart.splice(index, 1);
		this.actualizePrice();
	}

	public actualizePrice(): void {
		this.total = 0;

		for (var i = 0; i < this.shoppingCart.length; i++) {
			var amount: number = this.shoppingCart[i].amount;

			if (amount <= 0 || amount == null) {
				this.shoppingCart.splice(i, 1);
				break;
			}

			var priceForOne: number = this.shoppingCart[i].product.price;

			this.total += priceForOne * amount;
			this.shoppingCart[i].total = priceForOne * amount;
		}

		if (this.homeDelivery == null || this.homeDelivery == 0) {
			this.homeDelivery = null;
			this.doHomeDelivery = false;
		} else if (this.homeDelivery) {
			this.total += this.homeDelivery;
		}
	}

	public homeDeliveryChange(): void {
		this.homeDelivery ? (this.homeDelivery = 0) : (this.homeDelivery = null);
	}

	public finishOrder(): void {
		this.actualizePrice();

		var newBill: BillWithProducts = {
			idClient: this.client.id,
			createdAt: this.actualDate(),
			total: this.total,
			homeDelivery: this.homeDelivery != null ? this.homeDelivery : undefined,
			products: new Array<ProductWithAmount>(0)
		};

		this.shoppingCart.forEach((productInCart) => {
			if (productInCart.amount > 0) {
				newBill.products.push({
					idProduct: productInCart.product.id,
					amount: productInCart.amount
				} as ProductWithAmount);
			}
		});

		this.billsService.saveBill(newBill).subscribe(
			(response) => {
				//  Do the bill view
				const bill: Bill = {
					id: 0,
					createdAt: this.actualDate(),
					idClient: 0,
					total: this.total,
					homeDelivery: this.homeDelivery != null ? this.homeDelivery : 0
				};

				var products: ProductInBill[] = new Array<ProductInBill>(0);

				this.shoppingCart.forEach((product) => {
					products.push({
						id: 0,
						idBill: 0,
						name: product.product.name,
						price: product.product.price,
						amount: product.amount,
						message: product.message
					} as ProductInBill);
				});

				this.billChild.viewBill3(bill, this.client, products);

				this.sweet.created('Se creo el registro satisfactoriamente');
			},
			(error) => {
				this.sweet.error('Ocurrio un error');
				throw new Error(error);
			}
		);
	}

	private actualDate(): string {
		var today: string | null = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd');
		return today != null ? today : '';
	}

	public refreshPageEvent(): void {
		this.shoppingCart = new Array<ProductInCart>(0);
		this.total = 0;
		this.doHomeDelivery = false;
		this.homeDelivery = null;

		this.refreshPage.emit(null);
	}
}
