import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISummaryResponse } from '../../core/models/summary.model';
import { IResourceResponse } from '../../core/models/resource.model';
import { environment } from '../../../environments/environment';

const summaryURL = `https://62457c736b7ecf057c1ea959.mockapi.io/summary`;
const ResourceMapURL = `https://62457c736b7ecf057c1ea959.mockapi.io/maparecursos`;

const { url_base } = environment;
const input_data = {
  cod_cliente: 77889553,
  periodo: "2022-02"
};


@Injectable({
  providedIn: 'root',
})

export class SummaryService {
  constructor(private httpClient: HttpClient) {}
  
  getSummary() : Observable<ISummaryResponse> {
    return this.httpClient.get<ISummaryResponse>(summaryURL);
  }

  getResourceMap() : Observable<IResourceResponse> {
    return this.httpClient.get<IResourceResponse>(ResourceMapURL);
  }

  getPrueba() {
    let URL = url_base + '/resources/montoservicio/';
    console.log("URL CARLOS:", URL);
    return this.httpClient.post<any>(URL, input_data);
  }
  

}
