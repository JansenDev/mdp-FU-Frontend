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
