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

    getHito() : Observable<any>{
        let URL = 'https://futurov01.herokuapp.com/api/v1' + '/resources/montoservicio/';
        return this.httpClient.get<any>(URL);
    }

    registerHito(input : any) {
        let URL = 'https://futurov01.herokuapp.com/api/v1' + '/resources/montoservicio/';
        return this.httpClient.post<any>(URL, input);
    }
}
