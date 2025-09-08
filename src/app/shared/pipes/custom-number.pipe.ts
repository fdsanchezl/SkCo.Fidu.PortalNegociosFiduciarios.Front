import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber'
})
export class CustomNumberPipe implements PipeTransform {

  transform(value: any, digitsInfo?: string) {
    if (isNaN(parseInt(value))) {
      return value
    }

    return new DecimalPipe('en-ES').transform(value, digitsInfo);
  }

}
