import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const { url_base } = environment;

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(input : any) {
    let URL = url_base + '/auth/login/';
    return this.httpClient.post<any>(URL, input);
  }

}
