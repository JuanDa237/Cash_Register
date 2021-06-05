import { Component, Input } from '@angular/core';

// Imports
import { NgxPrinterService } from 'ngx-printer';

@Component({
	selector: 'app-print-bill',
	templateUrl: './print-bill.component.html'
})
export class PrintBillComponent {
	@Input()
	elementId: string;

	constructor(private printerService: NgxPrinterService) {
		this.elementId = '';
	}

	public print(): void {
		this.printerService.printDiv(this.elementId);
	}

	public exportPdf() {}
}
