import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IResourceRequest, IResourceResponse } from '../models/resource.model';


@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private httpClient: HttpClient) {}

  findResourceByPeriodClientProfileNames(
    idUser: number,
    period: string,
    client: string,
    profile?: string,
    names?: string
  ) {
    const { url_base } = environment;
    const URL = `${url_base}/resources/${idUser}/maparecursos`;

    let body: IResourceRequest = {
      periodo: period,
      cliente: client,
    };

    if (profile) {
      body['perfil'] = profile;
    }

    if (names) {
      body['names'] = names;
    }
    //
    console.log(body);

    return this.httpClient.post<IResourceResponse[]>(URL, body);
  }
}
