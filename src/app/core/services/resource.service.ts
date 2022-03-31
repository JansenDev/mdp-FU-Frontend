import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  IClientResponse,
  ICollaboratorResponse,
  IPeriodResponse,
  IProfileResponse,
  IResourceRequest,
  IResourceResponse,
} from '../models/resource.model';

const { url_base } = environment;
@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private httpClient: HttpClient) {}

  findResourceByPeriodClientProfileNames(
    idUser: number,
    period: string,
    codClient: string,
    codProfile?: string,
    collaborator?: string
  ) {
    const URL = `${url_base}/resources/${idUser}/maparecursos`;

    let bodyRequest: IResourceRequest = {
      periodo: period,
      cod_cliente: parseInt(codClient),
    };

    if (codProfile) {
      bodyRequest['cod_perfil'] = codProfile;
    }

    if (collaborator) {
      bodyRequest['cod_colaborador'] = collaborator;
    }

    return this.httpClient.post<IResourceResponse[]>(URL, bodyRequest);
  }

  findAllPeriods() {
    const URL = `${url_base}/resources/periodos`;

    return this.httpClient.get<IPeriodResponse[]>(URL);
  }

  findAllProfiles() {
    const URL = `${url_base}/resources/perfiles`;

    return this.httpClient.get<IProfileResponse[]>(URL);
  }

  findAllCollaborator() {
    const URL = `${url_base}/resources/colaboradores`;

    return this.httpClient.get<ICollaboratorResponse[]>(URL);
  }

  findClientByUser(idUser: number) {
    const URL = `${url_base}/resources/${idUser}/clientes`;

    return this.httpClient.get<IClientResponse[]>(URL);
  }
}
