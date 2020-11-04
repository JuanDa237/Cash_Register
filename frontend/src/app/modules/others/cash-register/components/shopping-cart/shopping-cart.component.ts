import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Client, createEmptyClient } from '@modules/others/clients/models';

import { Product, ProductInTicket } from '@modules/others/products/models';
import { ProductsService } from '@modules/others/products/services';

import { TicketsService } from '@modules/others/tickets/services';

import { ProductInCart } from '../../models';
import { TicketViewComponent } from '@modules/others/tickets/components';
import { TicketWithProducts, ProductWithAmount, Ticket } from '@app/modules/others/tickets/models';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
	public shoppingCart: Array<ProductInCart>;
	public total: number;

	public doHomeDelivery: boolean;
	public homeDelivery: number | null;

	@ViewChild(TicketViewComponent)
	public ticketChild!: TicketViewComponent;

	@Input()
	public client: Client;

	@Output()
	public refreshPage: EventEmitter<null>;

	constructor(private productsService: ProductsService, private ticketsService: TicketsService) {
		this.shoppingCart = new Array<ProductInCart>(0);
		this.total = 0;
		this.doHomeDelivery = false;
		this.homeDelivery = null;
		this.client = createEmptyClient();
		this.refreshPage = new EventEmitter<null>();
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
			total: product.price
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

		var newTicket: TicketWithProducts = {
			idClient: this.client.id,
			creationDate: this.actualDate(),
			total: this.total,
			homeDelivery: this.homeDelivery != null ? this.homeDelivery : undefined,
			products: new Array<ProductWithAmount>(0)
		};

		this.shoppingCart.forEach((productInCart) => {
			if (productInCart.amount > 0) {
				newTicket.products.push({
					idProduct: productInCart.product.id,
					amount: productInCart.amount
				} as ProductWithAmount);
			}
		});

		this.ticketsService.saveTicket(newTicket).subscribe(
			(response) => {
				//  Do the ticket view
				const ticket: Ticket = {
					id: 0,
					creationDate: this.actualDate(),
					idClient: 0,
					total: this.total,
					homeDelivery: this.homeDelivery != null ? this.homeDelivery : 0
				};

				var products: ProductInTicket[] = new Array<ProductInTicket>(0);

				this.shoppingCart.forEach((product) => {
					products.push({
						id: 0,
						idTicket: 0,
						name: product.product.name,
						price: product.product.price,
						amount: product.amount
					} as ProductInTicket);
				});

				this.ticketChild.viewTicket3(ticket, this.client, products);
			},
			(error) => {
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
