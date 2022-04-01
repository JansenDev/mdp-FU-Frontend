import { Pipe, PipeTransform } from '@angular/core';
import { states } from '../../core/constants/resource.constants';

@Pipe({
  name: 'state',
})
export class StatePipe implements PipeTransform {
  transform(value: string): string {
    return states[value];
  }
}
