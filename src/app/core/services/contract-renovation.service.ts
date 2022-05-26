import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICreateRenovationRequest, ICreateRenovationResponse, IGetRenovationData } from '../models/contract-renovation.model';

const { url_base } = environment;
const url = `${url_base}/renovation-request`

@Injectable({
  providedIn: 'root'
})
export class ContractRenovationService {

  constructor(private http: HttpClient) { }

  autocompleteFields(resourceMapId: number){
    return this.http.get<IGetRenovationData>(`${url}/auto/${resourceMapId}`);
  }

  createRenovationRequest(postData: ICreateRenovationRequest){ //TODO: tipar data
    return this.http.post<ICreateRenovationResponse>(`${url}/create`, postData);
  }
  
  refuseRenovation(body: any) {
    return this.http.post<any>(`${url}/reject/${body.cod_solicitud_renovacion}`, body.motivo_rechazo);
  }

  acceptRenovation(cod_solicitud_renovacion: number) {
    return this.http.get<any>(`${url}/approve/${cod_solicitud_renovacion}`);
  }
  
  getRenovationFields(idContract : number) {
    return this.http.get<any>(`${url_base}/solicitude/${idContract}/renovacion`);
  }
}
