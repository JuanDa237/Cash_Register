import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//Models
import { Breadcrumb } from '@modules/main/navigation/models';

//Services
import { NavigationService } from '@modules/main/navigation/services';

@Component({
    selector: 'app-dashboard-head',
    templateUrl: './dashboard-head.component.html'
})
export class DashboardHeadComponent implements OnInit, OnDestroy{
  
  public title!: string;
  public hideBreadcrumbs: boolean;
  public breadcrumbs!: Breadcrumb[];
  
  private subscription: Subscription = new Subscription();
  
  constructor(
    private navigationService: NavigationService
  ) {
    this.title = '';
    this.hideBreadcrumbs = false;
  }

  ngOnInit() {
    this.subscription.add(
      this.navigationService.getRouteData().subscribe(routeData => {

        if(routeData.title)
          this.title = routeData.title;

        this.hideBreadcrumbs = routeData.hideBreadcrumbs;
        this.breadcrumbs = routeData.breadcrumbs;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}