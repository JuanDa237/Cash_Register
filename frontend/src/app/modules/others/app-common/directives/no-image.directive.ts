import { Directive, Input } from '@angular/core';

@Directive({
	selector: 'img[noImage]',
	host: {
		'(error)': 'errorHandler()',
		'[src]': 'src'
	}
})
export class NoImageDirective {
	@Input()
	src: string;

	private noImageUrl: string;

	constructor() {
		this.src = '';
		this.noImageUrl = '/assets/images/noImage.png';
	}

	errorHandler() {
		this.src = this.noImageUrl;
	}
}
