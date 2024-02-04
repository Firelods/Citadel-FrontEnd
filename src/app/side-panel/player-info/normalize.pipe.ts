import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalize',
  standalone: true,
})
export class NormalizePipe implements PipeTransform {
  transform(value: string): string {
    return value
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replaceAll(' ', '_');
  }
}
