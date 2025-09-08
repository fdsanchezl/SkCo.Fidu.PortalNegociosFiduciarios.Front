import { PercentPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPercent'
})
export class CustomPercentPipe implements PipeTransform {

  transform(value: any, digitsInfo?: string): unknown {    
    if (isNaN(parseInt(value))) {
      return value
    }
    return new PercentPipe('es-ES').transform(value, digitsInfo);
  }

}
