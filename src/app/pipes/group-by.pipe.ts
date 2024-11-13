import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

    transform(collection: any[], property: string): any[] {
        if (!collection) {
            return [];
        }

        const groupedCollection = collection.reduce((acc, obj) => {
            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});

        return Object.keys(groupedCollection).map(key => ({
            key,
            value: groupedCollection[key]
        }));
    }
}
