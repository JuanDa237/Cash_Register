import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-error-500',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './error-500.component.html'
})
export class Error500Component {}
