import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IContractImbox } from '../models/contract-imbox-model';
import { IHiringRequest } from '../models/hiring-request.model';

const { url_base } = environment;

@Injectable({
  providedIn: 'root',
})
export class ContractImboxService {
  constructor(private httpClient: HttpClient) {}

  filterHiringRequesBy(
    idClient?: number,
    businessLine?: string,
    docNumber?: string,
    names?: string,
    status?: string
  ) {
    const URL = `${url_base}/contractSolicitude`;

    let options: IFilterContractImboxRequest = {};

    if (idClient) {
      options['cod_cliente'] = idClient;
    }
    if (businessLine) {
      options['cod_linea_negocio'] = businessLine;
    }

    if (docNumber) {
      options['nro_documento'] = docNumber;
    }

    if (status) {
      options['estado'] = status;
    }

    if (names) {
      options['nombre'] = names;
    }

    return this.httpClient.post<IContractImbox[]>(URL, options).pipe();
  }

  getHiringRequestById(idHiringRequest: string | number) {
    const URL = `${url_base}/contractSolicitude/${idHiringRequest}`;

    return this.httpClient.get<IHiringRequest>(URL);
  }

  approveHiringRequest(idHiringRequest: string | number) {
    const URL = `${url_base}/contractSolicitude/approve/${idHiringRequest}`;

    return this.httpClient.get<any>(URL);
  }

  rejectHiringRequest(idHiringRequest: string | number) {
    const URL = `${url_base}/contractSolicitude/reject/${idHiringRequest}`;

    return this.httpClient.get<any>(URL);
  }
}

export interface IFilterContractImboxRequest {
  cod_cliente?: number;
  cod_linea_negocio?: string;
  estado?: string;
  nro_documento?: string;
  nombre?: string;
}

export interface IFilterContract {
  idClient?: number;
  businessLine?: string;
  docNumber?: string;
  names?: string;
  status?: string;
}
