import { IPeriodResponse } from '../models/period.model';
import * as moment from 'moment';

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

export function timestampFormat(
  timestamp: string,
  format: string = 'DD-MM-YYYY'
) {
  if (!timestamp) {
    return null;
  }

  return moment(timestamp).format(format);
}
export function isHighDateEnd(
  inputDateStart: Date | string,
  inputDateEnd: Date | string
): boolean {
  const dateStart = moment(inputDateStart);
  const dateEnd = moment(inputDateEnd);

  return dateEnd.diff(dateStart) > 0;
}

export function toCapitalizeFirstLetterCase(word: string): string {
  if (word.trim() === '') return '';

  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function toCapitalizeCase(words: string): string {
  if (words.trim() === '') return '';

  let wordsCapitalized = words
    .split(' ')
    .filter((name: string) => name !== '')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return wordsCapitalized;
}

export function trimAllSpaces(words: string | null): string {
  if (!words) return '';
  return words!
    .split(' ')
    .filter((name: string) => name !== '')
    .join(' ');
}
