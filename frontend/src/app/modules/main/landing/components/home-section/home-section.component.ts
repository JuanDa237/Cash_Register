import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
	selector: 'app-home-section',
	templateUrl: './home-section.component.html',
	styleUrls: ['./home-section.component.scss']
})
export class HomeSectionComponent implements OnInit, OnChanges {
	@Input()
	public sectionClass!: string;

	@Input()
	public id: string;

	constructor() {
		this.id = '';
	}

	ngOnInit() {
		this.checkRequiredFields();
	}

	ngOnChanges() {
		this.checkRequiredFields();
	}

	checkRequiredFields(): void {
		if (this.id === '') {
			throw new Error("Attribute 'id' is required.");
		}
	}
}
