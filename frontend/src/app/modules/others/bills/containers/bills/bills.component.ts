import { Component, ViewChild } from '@angular/core';

// Models
import { Bill } from '../../models';

// Services
import { BillsService } from '../../services';

// Components
import { TableComponent } from '@app/modules/others/app-common/components';
import { BillViewComponent } from '../../components';
import { Sweet } from '@app/modules/others/app-common/libs';

@Component({
	selector: 'app-bills',
	templateUrl: './bills.component.html'
})
export class BillsComponent {
	public bills: Bill[];

	public selectedBill: Bill;

	public loading: boolean;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	@ViewChild(BillViewComponent)
	private billChild!: BillViewComponent;

	private sweet: Sweet;

	constructor(private billsService: BillsService) {
		this.bills = new Array<Bill>(0);

		this.selectedBill = {} as Bill;

		this.loading = true;
		this.sweet = new Sweet();
	}

	// Methods for html
	public search(dates: Date[]): void {
		this.loading = true;

		this.billsService.getBillsInInterval(dates[0].toString(), dates[1].toString()).subscribe(
			(response) => {
				this.bills = response;
				this.loading = false;

				this.table.rerenderTable();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public viewBill(bill: Bill) {
		const index: number = this.bills
			.map((x) => {
				return x.id;
			})
			.indexOf(bill.id);

		this.selectedBill = this.bills[index];
		this.billChild.viewBill2(this.selectedBill);
	}

	public async deleteBill(bill: Bill) {
		if (await this.sweet.delete('¿Estas seguro de eliminar el registro?')) {
			this.billsService.deleteBill(bill.id).subscribe(
				(response) => {
					const index: number = this.bills
						.map((x) => {
							return x.id;
						})
						.indexOf(bill.id);
					this.bills.splice(index, 1);

					this.table.rerenderTable();
					this.sweet.deleted('Se elimino el registro satisfactoriamente');
				},
				(error) => {
					throw new Error(error);
				}
			);
		}
	}

	public canDelete(createdAt: string): boolean {
		var createdAtDate = new Date(createdAt);
		var now = new Date();

		createdAtDate.setHours(0, 0, 0, 0);
		now.setHours(0, 0, 0, 0);

		return createdAtDate.getTime() == now.getTime();
	}
}
