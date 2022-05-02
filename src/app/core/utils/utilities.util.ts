import { IPeriodResponse } from '../models/period.model';
import * as moment from 'moment';

// Encontrar periodo activo
export function findPeriodActive(periodlist: IPeriodResponse[]): string {
  let codState = '';

  for (let index = 0; index < periodlist.length; index++) {
    const period = periodlist[index];

    if (period.estado == 'A') {
      codState = period.periodo;
      break;
    }
  }

  return codState;
}
// dar formato a fecha default = DD-MM-YY
export function timestampFormat(
  timestamp: string | moment.Moment,
  format: string = 'YYYY-MM-DD'
) {
  if (!timestamp) {
    return null;
  }

  if (!(typeof timestamp === 'string')) {
    return timestamp.format(format);
  }

  return moment(timestamp).format(format);
}

// Si fecha fin es mayor return true
export function isHighDateEnd(
  inputDateStart: Date | string,
  inputDateEnd: Date | string,
  orEquals = false
): boolean {
  const dateStart = moment(inputDateStart);
  const dateEnd = moment(inputDateEnd);

  if (!orEquals) {
    return dateEnd.diff(dateStart) > 0;
  }

  return dateEnd.diff(dateStart) >= 0;
}

// Capitalizar primera letra de una palabra
export function toCapitalizeFirstLetterCase(word: string): string {
  if (word.trim() === '') return '';

  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Capitalizar primera letra de una palabra o  oracion
export function toCapitalizeCase(words: string): string {
  if (words.trim() === '') return '';

  let wordsCapitalized = words
    .split(' ')
    .filter((name: string) => name !== '')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return wordsCapitalized;
}

// Limpiar espacios demás en una oracion
export function trimAllSpaces(words: string | null): string {
  if (!words) return '';
  return words!
    .split(' ')
    .filter((name: string) => name !== '')
    .join(' ');
}
