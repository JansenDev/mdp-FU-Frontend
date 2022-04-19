import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBusinessLine } from '../models/businessLine.model';
import { IEPS } from '../models/EPS.model';
import { IPeriodResponse } from '../models/period.model';
import { IProfileResponse } from '../models/profile.model';
import { ISalaryBandReponse } from '../models/salaryBand.model';
import { NotificationService } from './notification.service';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})
export class CboxService {
  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  findAllBusinessLine() {
    const URL = `${url_base}/businessLine`;

    return this.httpClient.get<IBusinessLine[]>(URL);
  }

  findAllProfiles() {
    const URL = `${url_base}/resources/profiles`;

    return this.httpClient.get<IProfileResponse[]>(URL);
  }

  findAllPeriods() {
    const URL = `${url_base}/resources/periods`;

    return this.httpClient.get<IPeriodResponse[]>(URL).pipe(
      catchError((err: HttpErrorResponse) => {
        let message = '';

        if (err.status == 0) {
          message = `Error de conexión ${err.url}`;
          this.notificationService.toast(
            'error',
            'Servidor fuera de línea',
            'ERROR'
          );
        }

        if (err.status == 500) {
          message = `Error de conexión ${err.url}`;
          this.notificationService.toast(
            'error',
            'Falla en el servidor',
            'ERROR'
          );
        }

        return throwError(() => new Error(message));
      })
    );
  }

  findAllEPS() {
    const URL = `${url_base}/eps`;
    return this.httpClient.get<IEPS[]>(URL);
  }

  findSalaryBandByIdProfileAndLevel(idProfile: number, level: string) {
    const URL = `${url_base}/salaryBand/${idProfile}/${level}`;
    return this.httpClient.get<ISalaryBandReponse[]>(URL).pipe(
      map((salaryBandResponse) => {
        if (salaryBandResponse.length == 0 || salaryBandResponse == undefined) {
          this.notificationService.toast(
            'warning',
            'No se encontró banda salarial',
            'Warning'
          );
          return [{ cod_banda_salarial: null, maximo: 0, minimo: 0 }];
        }
        return salaryBandResponse;
      })
    );
  }
}
