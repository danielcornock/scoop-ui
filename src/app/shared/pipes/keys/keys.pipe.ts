import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  transform(value: object): unknown {
    console.log(Object.keys(value));

    return Object.keys(value);
  }
}
