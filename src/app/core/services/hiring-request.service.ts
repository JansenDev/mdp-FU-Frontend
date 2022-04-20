import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHiringRequest } from '../models/hiring-request.model';
import { IStatusRequestSimple } from '../models/status-request-simple.model';
import { NotificationService } from './notification.service';

const { url_base } = environment;

@Injectable({
  providedIn: 'root',
})
export class HiringRequestService {
  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  registerHiringRequest(hiringContractBody: IHiringRequest) {
    const URL = `${url_base}/contractSolicitude/newSolicitude`;

    let hiringRequest: IHiringRequest = {
      ...hiringContractBody,
    };

    const {
      cod_eps,
      eps_parcial_total,
      ind_sctr,
      bono_men,
      condicional_adicional,
    } = hiringContractBody;

    if (cod_eps) {
      hiringRequest['cod_eps'] = cod_eps;
      hiringRequest['eps_parcial_total'] = eps_parcial_total;
    }

    if (ind_sctr) {
      hiringRequest['ind_sctr'] = 'S';
    } else {
      hiringRequest['ind_sctr'] = 'N';
    }

    if (bono_men && bono_men ) {
      hiringRequest['bono_men'] = bono_men;
    }

    if (condicional_adicional) {
      hiringRequest['condicional_adicional'] = condicional_adicional;
    }

    return this.httpClient.post<IStatusRequestSimple>(URL, hiringRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        let message = err.error.message;

        if (err.status == 409) {
          this.notificationService.toast('warning', message, 'WARNING', 8000);

        }

        return throwError(() => Error(message));
      })
    );
  }
}