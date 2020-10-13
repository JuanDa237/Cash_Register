import { Component } from '@angular/core';

//Models
import { SideNavItems, SideNavSection } from '@modules/main/navigation/models';

//Data
import { sideNavItems, sideNavSections } from '@modules/main/navigation/data';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
    
    public sideNavItems: SideNavItems;
    public sideNavSections: SideNavSection[];

    constructor() {
        this.sideNavItems = sideNavItems;
        this.sideNavSections = sideNavSections;
    }
}