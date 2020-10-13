import { Component, Input } from '@angular/core';

//Models
import { SideNavItem } from '@modules/main/navigation/models';

@Component({
    selector: 'app-side-nav-item',
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['./side-nav-item.component.scss']
})
export class SideNavItemComponent {
    
    @Input() 
    public sideNavItem!: SideNavItem;

    public expanded = false;
}