import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Models
import { RouteData } from '@modules/main/navigation/models';

//Module
import { ErrorModule } from './error.module';

//Containers
import * as errorContainers from './containers';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '404'
    },
    {
        path: '401',
        canActivate: [],
        component: errorContainers.Error401Component,
        data: {
            title: 'Error 401'
        } as RouteData
    },
    {
        path: '404',
        canActivate: [],
        component: errorContainers.Error404Component,
        data: {
            title: 'Error 404'
        } as RouteData
    },
    {
        path: '500',
        component: errorContainers.Error500Component,
        data: {
            title: 'Error 500'
        } as RouteData
    },
    {
        path: '**',
        pathMatch: 'full',
        component: errorContainers.Error404Component
    }
];

@NgModule({
    imports: [ErrorModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorRoutingModule {}