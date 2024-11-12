import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysFormatPipe'
})
export class DaysFormatPipePipe implements PipeTransform {

  transform(value: any) {
    value = new Date(value).getTime();

    var _value = Number(value);

    var dif = Math.floor( ( (Date.now() - _value) / 1000 ) / 86400 );

    if ( dif < 30 ){
         return convertToNiceDate(value);
    }else{
        var datePipe: any = new DatePipe("en-US");
        value = datePipe.transform(value, 'MMM-dd-yyyy');
        return value;
    }
 }

}

function convertToNiceDate(time: string) {
  var date = new Date(time),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      daydiff = Math.floor(diff / 86400);
      // debugger
      if(daydiff ==0) {
        return "Today"
      } else if(daydiff ==-1) {
        return "Tomorrow"
      } else if(daydiff ==-2){
        return returnDayName(date.getDay(), date)
      } else {
        return ''
      }
}

function returnDayName(value: any, date: any) {
  if(value==0) {
    return 'Sunday'
  } else if(value==1) {
    return 'Moday'
  } else if(value==2) {
    return 'Tuesday'
  } else if(value==3) {
    return 'Wednesday'
  } else if(value==4) {
    return 'Thursday'
  } else if(value==5) {
    return 'Friday'
  } else if(value==6) {
    return 'Saturday'
  } else {
    return date
  }
}
