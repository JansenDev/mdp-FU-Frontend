import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = `https://rickandmortyapi.com/api/character/125`
@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private httpClient: HttpClient) {}



  findById(){
    return this.httpClient.get<any>(URL)
  }
}
