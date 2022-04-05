import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISummaryResponse } from '../../core/models/summary.model';
import { IResourceResponse } from '../../core/models/resource.model';

const summaryURL = `https://62457c736b7ecf057c1ea959.mockapi.io/summary`;
const ResourceMapURL = `https://62457c736b7ecf057c1ea959.mockapi.io/maparecursos`;

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
}
