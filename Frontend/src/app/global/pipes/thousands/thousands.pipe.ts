import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsPipe'
})
export class ThousandsPipe implements PipeTransform {

  public transform(value: any) {
    if(value != null && typeof value != "undefined")
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      // I just search in google xD
  }

}
