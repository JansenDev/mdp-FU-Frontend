import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = `https://rickandmortyapi.com/api/character/125`
const summaryUrl = `https://62457c736b7ecf057c1ea959.mockapi.io/summary`;

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private httpClient: HttpClient) {}



  findById(){
    return this.httpClient.get<any>(URL)
  }
  
  getSummary() : Observable<any>{
    return this.httpClient.get<any>(summaryUrl);
  }

}
