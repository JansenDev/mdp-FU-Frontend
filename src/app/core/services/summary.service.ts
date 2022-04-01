import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISummaryResponse } from '../../core/models/summary.model';

const summaryUrl = `https://62457c736b7ecf057c1ea959.mockapi.io/summary`;

@Injectable({
  providedIn: 'root',
})

export class SummaryService {
  constructor(private httpClient: HttpClient) {}
  
  getSummary() : Observable<ISummaryResponse>{
    return this.httpClient.get<ISummaryResponse>(summaryUrl);
  }

}
