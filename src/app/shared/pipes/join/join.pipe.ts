import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(value: Array<unknown>, delimiter: string): unknown {
    return value.join(delimiter);
  }
}
