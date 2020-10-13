import { Injectable } from '@angular/core';
import { Router, ChildActivationEnd} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { RouteData } from '../models';

@Injectable()
export class NavigationService {
    
    public sideNavVisible = new BehaviorSubject(true);
    public routeData = new BehaviorSubject({} as RouteData);

    constructor(
        public router: Router
    ) {

        this.router.events.pipe(filter(event => event instanceof ChildActivationEnd)).subscribe(
            event => {
                let snapshot = (event as ChildActivationEnd).snapshot;

                while (snapshot.firstChild !== null) {
                    snapshot = snapshot.firstChild;
                }

                this.routeData.next(snapshot.data as RouteData);
            });
    }

    getSideNavVisible(): Observable<boolean> {
        return this.sideNavVisible;
    }

    toggleSideNav(visibility?: boolean) {

        if (typeof visibility !== 'undefined') {
            this.sideNavVisible.next(visibility);
        } 
        else {
            this.sideNavVisible.next(!this.sideNavVisible.value);
        }
    }

    getRouteData(): Observable<RouteData> {
        return this.routeData;
    }
}