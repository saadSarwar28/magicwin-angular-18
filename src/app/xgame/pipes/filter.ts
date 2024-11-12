import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) return [];
    if (!value || value.length == 0) return items;
    let obj = items.filter(it => it[field].toLowerCase().indexOf(value.toLowerCase()) != -1);

    if (obj && obj.length > 0 ) {
      return obj[0].properties;
    } else {
      return [];
    }
  }

}



@Pipe({
  name: 'filterProperties'
})
export class FilterPropertiesPipe implements PipeTransform {

  transform(items: any[], field: string, value: string,cardtype:string): any[] {

    if (!items) return [];
    if (!value || value.length == 0) return items;
    let obj = items.filter(it => it[field].toLowerCase().indexOf(value.toLowerCase()) != -1);

    if (obj && obj.length > 0 && obj[0].properties.length>0) {
      let bc= obj[0].properties.filter((x:any)=>x.name==cardtype);
      if(bc && bc.length>0 && bc[0].value.length>0){

        return bc[0].value.split(',');
      }else{
        return [];
      }
    } else {
      return [];
    }
  }

}


@Pipe({name: 'ordinal'})
export class OrdinalPipe implements PipeTransform {
    transform(int:number) {
        const ones = +int % 10, tens = +int % 100 - ones;
        return int + ["th","st","nd","rd"][ tens === 10 || ones > 3 ? 0 : ones ];
    }
}

