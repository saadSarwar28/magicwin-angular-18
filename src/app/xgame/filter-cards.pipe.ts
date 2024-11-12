import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filterCards',
})
export class FilterCardsPipe implements PipeTransform {
  transform(items: any[], filter: string): Array<any> {
    if(filter == 'Dealer'){
    return items.filter(x=>x.name == filter);
    }else{
      return items.filter(x=>x.name!= filter && x.name!='Dealer');
    }
  }

}

@Pipe({
  name: 'SpaceBtwnNum',
})
export class AddSpaceBtwnNumPipe implements PipeTransform {
  transform(inputString: string,):string{
    return inputString.replace(/([a-zA-Z])([0-9])/g, '$1 $2');
  }

}


@Pipe({
  name: 'filterOtherCards',
})
export class FilterOtherCardsPipe implements PipeTransform {
  transform(items: any[], filter: string[]): Array<any> {
    return items.filter(item => filter.includes(item.name));
  }

}


@Pipe({
  name: 'filterCardStatus',
})
export class FilterCardsStatusPipe implements PipeTransform {
  transform(item: string): string {
    if (item?.length>0) {
      if (item === "IN_PLAY" || item == 'STOOD') {
        return "";
      } else {
        if (item == 'WINNER' || item == 'LOSER') {
          return  item;
        }
         else {
          return item;
        }
      }
    }
    return item;
  }

}


@Pipe({
  name: 'filterCardPosition',
})
export class FilterPositionPipe implements PipeTransform {
  transform(item: string): string {
    if (item.length>0) {
      if (item === "1") {
        return "1st";
      }
      else if (item === "2") {
        return "2nd";
      }
      else if (item === "3") {
        return "3rd";
      } else {
        return "4th";
      }
    }
    return "";
  }

}

