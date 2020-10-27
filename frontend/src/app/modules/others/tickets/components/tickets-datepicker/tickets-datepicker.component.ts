import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-tickets-datepicker',
	templateUrl: './tickets-datepicker.component.html'
})
export class TicketsDatepickerComponent {
	public ticketForm: FormGroup;

	@Output()
	public dates: EventEmitter<Date[]>;

	constructor() {
		this.dates = new EventEmitter<Date[]>();

		var today: string | null = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd');

		this.ticketForm = new FormGroup({
			since: new FormControl(today, Validators.required),
			until: new FormControl(today, Validators.required)
		});
	}

	public submitEvent(): void {
		if (this.ticketForm.valid)
			this.dates.emit([
				this.ticketForm.get('since')?.value,
				this.ticketForm.get('until')?.value
			]);
	}
}
