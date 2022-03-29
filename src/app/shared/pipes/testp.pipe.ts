import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testp',
})
export class TestpPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return 'ESTE ES UN PIPE 👍';
  }
}
