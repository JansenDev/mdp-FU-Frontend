import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClientResponse } from '../models/client.model';
import { environment } from '../../../environments/environment';

const { url_base } = environment;

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  findClientByUser(idUser: number) {
    const URL = `${url_base}/resources/${idUser}/clients`;

    return this.httpClient.get<IClientResponse[]>(URL);
  }
}
