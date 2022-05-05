import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICreatePeriodRequest, IPeriodResponse, IUpdatePeriodRequest } from '../models/period.model';

const { url_base } = environment;
const url = `${url_base}/period`
@Injectable({
  providedIn: 'root'
})
export class PeriodsService {

  constructor(private http: HttpClient) { }

  getAllPeriods(){
    return this.http.get<IPeriodResponse[]>(`${url}`);
  }

  getLastPeriod(){
    return this.http.get<IPeriodResponse>(`${url}/last-period`);
  }

  createPeriod(period: ICreatePeriodRequest){
    return this.http.post<IPeriodResponse>(`${url}/create`, period);
  }

  updatePeriod(period: IUpdatePeriodRequest){
    return this.http.put<IPeriodResponse>(`${url}/update`, period)
  }

}
