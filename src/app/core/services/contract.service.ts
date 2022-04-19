import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const HOST = environment.url_base;
const URL_BASE = `${HOST}/contract`;

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private httpClient: HttpClient) {}

  isValidDocumentNumber(documentNumber: string) {
    const URL = `${URL_BASE}/isThereAContractActive/${documentNumber}`;
    return this.httpClient.get<IDocumentNumberResponse[]>(URL).pipe(
      map((statusResponse) => {
        const status = statusResponse[0];

        if (!status?.bool) {
          return false;
        }

        return true;
      })
    );
  }
}

export interface IDocumentNumberResponse {
  bool: boolean;
}
