import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@modules/others/app-common/components';

// Models
import { Product } from '../../models/index';

// Services
import { ProductsService } from '../../services/index';

// Libs
import { Sweet } from '@modules/others/app-common/libs';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
	public products: Array<Product>;

	public loading: boolean;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	private sweet: Sweet;

	constructor(private productsService: ProductsService) {
		this.products = new Array<Product>(0);
		this.loading = true;
		this.sweet = new Sweet();
	}

	ngOnInit(): void {
		this.getProducts();
	}

	private getProducts() {
		this.productsService.getProducts().subscribe(
			(response) => {
				this.products = response;
				this.loading = false;
				this.table.renderTable();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public async deleteProduct(id: number): Promise<void> {
		if (await this.sweet.delete('¿Estas seguro de eliminar el producto?')) {
			this.productsService.deleteProduct(id).subscribe(
				(resolve) => {
					const index: number = this.products
						.map((x) => {
							return x.id;
						})
						.indexOf(id);
					this.products.splice(index, 1);

					// Events
					this.table.rerenderTable();
					this.sweet.deleted('Se elimino el producto satisfactoriamente');
				},
				(error) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}
}
