import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import  $ from 'jquery';
import 'daterangepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-date',
  imports: [FormsModule],
  templateUrl: './date.html',
  styleUrl: './date.scss'
})
export class DateRangeComponent implements AfterViewInit {
  startDate:Date |null =null
  endDate:Date |null =null
  errorMessage:string |null =null

  @Output() dateRangeSelected = new EventEmitter<{start: string, end:string}>();
  
 
 ngAfterViewInit(): void {
    const input = $('input[name="daterange"]');

     (input as any).daterangepicker(
      {
        opens: 'left',
      },
      (start: moment.Moment, end: moment.Moment, label: string) => {
        console.log(
          `A new date selection was made: ${start.format('YYYY-MM-DD')} to ${end.format('YYYY-MM-DD')}`
        );

        this.startDate = start.toDate();
        this.endDate = end.toDate();
        this.onDateChange();
      }
    );
  }




  onDateChange(): void{
    if(this.startDate && this.endDate){
      const start = new Date(this.startDate)
      const end = new Date(this.endDate)
      if(start > end){
        this.errorMessage = 'La fecha de inicio debe ser anterior a la fecha fin.'
      }else{
        this.errorMessage=null;
        this.dateRangeSelected.emit({start: this.startDate.toString(), end: this.endDate.toString()})
      }
    }
  }
}
