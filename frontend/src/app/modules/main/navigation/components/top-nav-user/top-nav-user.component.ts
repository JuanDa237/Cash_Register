import { ChangeDetectionStrategy, Component } from '@angular/core';
//import { UserService } from '@modules/main/auth/services';

@Component({
    selector: 'app-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent {
    //constructor(public userService: UserService) {}
}