import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: any, currencyCode?: string, display?: string | boolean, digitsInfo?: string): unknown {
    if (isNaN(parseInt(value))) {
      return value
    }
    let currency = new CurrencyPipe('es-ES').transform(value, currencyCode, display, digitsInfo);
    currency = `$ ${currency?.replace('$', '')}`;
    return currency;
  }

}
