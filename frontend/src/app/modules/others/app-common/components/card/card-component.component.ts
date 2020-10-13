import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html'
})
export class CardComponentComponent {

  @Input()
  customClasses: string[];

  constructor() {
    this.customClasses = new Array<string>(0);
  }
}