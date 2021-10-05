import { Pipe, PipeTransform } from '@angular/core';
import { Dolce } from '../common/dolce';
import { DolceService } from '../services/dolce.service';

@Pipe({
  name: 'checkday'
})
export class CheckdayPipe implements PipeTransform {

  constructor(public service: DolceService){}

  transform(prezzo: number, date: Date): number {
    if(prezzo){
      let diffDay = this.service.calcDiffDay(new Date(date));
      console.log('CheckdayPipe diffDay', diffDay);
      if(diffDay === 2){
        prezzo = (prezzo - ((prezzo*20)/100));
      }else if(diffDay === 3){
        prezzo = (prezzo - ((prezzo*80)/100));
      }
    }
    return prezzo; 
  }
}

