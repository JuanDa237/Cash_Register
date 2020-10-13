import { Component } from '@angular/core';

//Services
import { NavigationService } from '@modules/main/navigation/services';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {

    constructor(
        private navigationService: NavigationService
    ) {}
    
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
}