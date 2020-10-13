import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-error-404',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './error-404.component.html'
})
export class Error404Component {
}