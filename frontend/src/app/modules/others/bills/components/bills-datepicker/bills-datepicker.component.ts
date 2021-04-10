import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-bills-datepicker',
	templateUrl: './bills-datepicker.component.html'
})
export class BillsDatepickerComponent {
	public billForm: FormGroup;

	@Output()
	public dates: EventEmitter<Date[]>;

	constructor() {
		this.dates = new EventEmitter<Date[]>();

		var today: string | null = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd');

		this.billForm = new FormGroup({
			since: new FormControl(today, Validators.required),
			until: new FormControl(today, Validators.required)
		});
	}

	public submitEvent(): void {
		if (this.billForm.valid) this.dates.emit([this.since?.value, this.until?.value]);
	}

	// Getters

	get since() {
		return this.billForm.get('since');
	}

	get until() {
		return this.billForm.get('until');
	}
}
