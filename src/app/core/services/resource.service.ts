import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// models
import { IPeriodResponse } from '../models/period.model';
import { IClientResponse } from '../models/client.model';
import { IProfileResponse } from '../models/profile.model';
import { IResourceRequest } from '../models/resource.model';
import { IResourceResponse } from '../models/resource.model';
import {
  ICollaboratorAssigned,
  ICollaboratorResponse,
} from '../models/collaborator.model';
import { NotificationService } from './notification.service';

const { url_base } = environment;
@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  findResourceByPeriodClientProfileNames(
    period: string,
    codClient: string,
    codProfile?: string,
    collaborator?: string,
    contractexpire?: string
  ) {
    const URL = `${url_base}/resources/resourcesmap`;

    let bodyRequest: IResourceRequest = {
      periodo: period,
      cod_cliente: parseInt(codClient),
    };

    if (codProfile) {
      bodyRequest['cod_perfil'] = codProfile;
    }

    if (collaborator) {
      bodyRequest['nombres'] = collaborator;
    }

    if (contractexpire) {
      bodyRequest['contrato_vencer'] = contractexpire;
    }

    return this.httpClient.post<IResourceResponse[]>(URL, bodyRequest).pipe(
      map((resourceResponse) => {
        if (resourceResponse.length == 0) {
          this.notificationService.toast(
            'info',
            'No se encontró recurso',
            'Ups!',
            5000
          );
        }
        return resourceResponse;
      })
    );
  }

  /**
   * @deprecated The method should not be used
   */
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

  /**
   * @deprecated The method should not be used
   */
  findAllProfiles() {
    const URL = `${url_base}/resources/profiles`;

    return this.httpClient.get<IProfileResponse[]>(URL);
  }

  findCollaboratorsByClientAndPeriod(client: number, period: string) {
    const URL = `${url_base}/resources/${client}/collaborators/${period}`;

    return this.httpClient.get<ICollaboratorResponse[]>(URL);
  }

  /**
   * @deprecated The method should not be used
   */
  findClientByUser(idUser: number) {
    const URL = `${url_base}/resources/${idUser}/clients`;

    return this.httpClient.get<IClientResponse[]>(URL);
  }

  findCollaboratorsByidClient(
    idClient: string,
    documentNumber?: string,
    names?: string
  ) {
    const URL = `${url_base}/resources/${idClient}/collaboratorsActives`;

    const dataBodyRequest = {
      nombres: names,
      nro_documento: documentNumber,
    };

    return this.httpClient.post<ICollaboratorAssigned[]>(URL, dataBodyRequest);
  }
}
