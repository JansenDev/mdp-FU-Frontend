import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//estructuras de modelo
import { Productivity } from '../models/productivity.model';
import { Contract } from '../models/contract.model';
import { Assignment } from '../models/assignment.model';

const { url_base } = environment;
const url = `${url_base}/resources`
@Injectable({
  providedIn: 'root'
})
export class ResourceDetailService {

  //private Url = 'https://6245bda4f89d1cacd808536d.mockapi.io/api/detalle/'
  constructor(private http: HttpClient) { }

  getResourceProductivityByCode(id: number){
    return this.http.get<Productivity>(`${url}/productividad/${id}`);
  }

  //Formto de periodo: MM-YYYY
  getContractByCollaboratorIdAndPeriod(id: number, period: string){
    return this.http.get<Contract>(`${url}/contrato/${id}/${period}`)
  }

  getAssigmentsByCollabCodePeriodAndClientCode(collabId: number, period: string, clientId: number){
    return this.http.get<Assignment[]>(`${url}/asignaciones/${collabId}/${period}/${clientId}`);
  }

  /* getMockDetail(id: number){ //Detail response
    return this.http.get<any>(`${this.Url}${id}`);
  } */
}
