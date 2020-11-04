import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { NavigationService } from '@modules/main/navigation/services';

@Component({
	selector: 'app-layout-dashboard',
	templateUrl: './layout-dashboard.component.html',
	styleUrls: ['./layout-dashboard.component.scss']
})
export class LayoutDashboardComponent implements OnInit, OnDestroy {
	@HostBinding('class.sb-sidenav-toggled')
	public sideNavHidden = false;

	private subscription: Subscription = new Subscription();

	constructor(private navigationService: NavigationService) {}

	ngOnInit() {
		this.subscription.add(
			this.navigationService.getSideNavVisible().subscribe((isVisible) => {
				this.sideNavHidden = !isVisible;
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
