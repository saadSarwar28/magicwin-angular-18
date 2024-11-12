import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runnerfilter'
})
export class RunnerfilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
