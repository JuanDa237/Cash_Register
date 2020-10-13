import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-error-401',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './error-401.component.html'
})
export class Error401Component {
}