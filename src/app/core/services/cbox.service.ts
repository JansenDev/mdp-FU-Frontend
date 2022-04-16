import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBusinessLine } from '../models/businessLine.model';
import { IPeriodResponse } from '../models/period.model';
import { IProfileResponse } from '../models/profile.model';
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

  findBusinessLine() {
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
}
