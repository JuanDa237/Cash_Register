import { Component, Input } from '@angular/core';

// Models
import { SideNavItem } from '@modules/main/navigation/models';

//Animations
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-side-nav-item',
	templateUrl: './side-nav-item.component.html',
	styleUrls: ['./side-nav-item.component.scss'],
	animations: [
		trigger('fade', [
			state('void', style({ opacity: 1 })),
			transition(':enter', [style({ opacity: 0 }), animate('0.5s ease-out')]),
			transition(':leave', [animate('0.5s ease-in', style({ opacity: 0 }))])
		])
	]
})
export class SideNavItemComponent {
	@Input()
	public sideNavItem!: SideNavItem;

	public expanded = false;
}
