import { Pipe, PipeTransform } from '@angular/core';
import { kebabCase } from 'lodash';

@Pipe({
  name: 'kebabCase'
})
export class KebabCasePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return kebabCase(value);
  }
}
