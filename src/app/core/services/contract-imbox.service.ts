import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IContractImbox } from '../models/contract-imbox-model';

const { url_base } = environment;

@Injectable({
  providedIn: 'root',
})
export class ContractImboxService {
  constructor(private httpClient: HttpClient) {}

  findContractSolicitudeBy(
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
      options['nombre_apellidos'] = names;
    }

    return this.httpClient.post<IContractImbox[]>(URL, options).pipe(
      map(data=>{
        console.log(data);

        return data
      })
    )
  }
}

export interface IFilterContractImboxRequest {
  cod_cliente?: number;
  cod_linea_negocio?: string;
  estado?: string;
  nro_documento?: string;
  nombre_apellidos?: string;
}

export interface IFilterContract {
  idClient?: number;
  businessLine?: string;
  docNumber?: string;
  names?: string;
  status?: string;
}
