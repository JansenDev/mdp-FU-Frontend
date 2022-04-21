import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const { url_base } = environment;

@Injectable({
  providedIn: 'root',
})

export class BillingServicesService {
    constructor(private httpClient: HttpClient) {}

    getHitos(input : any) : Observable<any> {
        let URL = 'https://futurov01.herokuapp.com/api/v1' + '/payment-service/get/';
        return this.httpClient.post<any>(URL, input);
    }

    registerHito(input : any) : Observable<any> {
        let URL = 'https://futurov01.herokuapp.com/api/v1' + '/payment-service/create';
        return this.httpClient.post<any>(URL, input);
    }
}
