import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {
  transform(item: object): unknown {
    return Object.values(item);
  }
}
