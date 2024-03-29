import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { datatableLanguage } from '../../data/index';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
	@Input()
	public columns: Array<string>;

	@Input()
	public extraClass: string;

	@Input()
	public footer: boolean;

	@Input()
	public pageLength: number;

	@Input()
	public lengthChange: boolean;

	@Input()
	public info: boolean;

	@ViewChild(DataTableDirective, { static: false })
	dtElement!: DataTableDirective;

	public dtOptions: DataTables.Settings;
	public dtTrigger: Subject<any>;

	constructor() {
		this.dtOptions = {};
		this.dtTrigger = new Subject<any>();

		this.columns = new Array<string>(0);
		this.extraClass = '';
		this.footer = true;
		this.pageLength = 10;
		this.lengthChange = true;
		this.info = true;
	}

	// Angular methods
	ngOnInit(): void {
		this.checkRequiredFields();

		this.dtOptions = {
			language: datatableLanguage,
			responsive: true,
			pageLength: this.pageLength,
			lengthChange: this.lengthChange,
			info: this.info
		};
	}

	ngOnChanges(): void {
		this.checkRequiredFields();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	// Private methods
	private checkRequiredFields(): void {
		if (this.columns.length <= 0) throw new Error("Attribute 'columns' is required.");
	}

	// Public methods

	public renderTable() {
		this.dtTrigger.next();
	}

	public rerenderTable() {
		if (!this.dtElement.dtInstance) {
			this.renderTable();
		} else {
			this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
				// Destroy the table first
				dtInstance.destroy();
				// Call the dtTrigger to rerender again
				this.dtTrigger.next();
			});
		}
	}
}
