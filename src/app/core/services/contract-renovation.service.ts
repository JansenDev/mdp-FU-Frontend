import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IGetRenovationData } from '../models/contract-renovation.model';

const { url_base } = environment;
const url = `${url_base}/renovation-request`

@Injectable({
  providedIn: 'root'
})
export class ContractRenovationService {

  constructor(private http: HttpClient) { }

  autocompleteFields(collaboratorId: number){
    return this.http.get<IGetRenovationData>(`${url}/auto/${collaboratorId}`);
  }
}
