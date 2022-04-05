import { Pipe, PipeTransform } from '@angular/core';
import { STATE } from '../../core/constants/resource.constants';

@Pipe({
  name: 'state',
})
export class StatePipe implements PipeTransform {
  transform(value: string): string {
    return STATE[value];
  }
}
