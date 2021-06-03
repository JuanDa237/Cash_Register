import { Component, Input } from '@angular/core';

// Models
import { Client } from '@app/modules/others/clients/models';
import { Bill } from '../../models';

// Imports
import jsPDF from 'jspdf';

@Component({
	selector: 'app-print-pdf',
	templateUrl: './print-pdf.component.html'
})
export class PrintPdfComponent {
	@Input()
	elementId: string;

	@Input()
	client?: Client;

	@Input()
	bill?: Bill;

	constructor() {
		this.elementId = '';
	}

	public print(): void {
		// Create new window and print it
		const bill = document.getElementById(this.elementId);

		// Try to delete image

		var win = window.open();

		if (win != null) {
			win.document.open();
			win.document.write(`
			<style>
			body { width: 58mm }
			</style>
			`);
			win.document.write(bill?.innerHTML || '');
			win.document.close();
			win.print();
		}
	}

	public async exportPdf(): Promise<void> {
		// I tried with jsPDF, html2canvas asd html2pdf but i can't
		const pdf = this.generatePdf();
		pdf.autoPrint();
		pdf.save(this.generatePdfName());
	}

	// Private
	private generatePdf(): jsPDF {
		// a6 = [297.64, 419.53] I think is the best size
		const pdf = new jsPDF('p', 'pt', 'a6');

		pdf.setFontSize(22);
		pdf.setTextColor(255, 0, 0);
		pdf.text('Titulo prueba', 20, 20);

		// Investigate jsPDF AutoTable
		// pdf.table(5, 5, this.products, ['Producto', 'Cantidad', 'Precio'], {});

		return pdf;
	}

	private generatePdfName(): string {
		var name: string = '';

		if (typeof this.bill != 'undefined' && typeof this.client != 'undefined') {
			name = `${this.client.name}_${this.bill.createdAt}`;
		} else {
			const date: Date = new Date();

			if (typeof this.client != 'undefined') {
				name = this.client.name + '_';
			}
			name = name + `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
		}

		name = name.replace(/\s+/g, '_') + '.pdf';
		return name;
	}
}
