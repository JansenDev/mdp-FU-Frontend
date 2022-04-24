import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces
import { ICreateServiceRequest,
         ICreateServiceResponse,
         IExchangeRateResponse,
         IPaymentMethodResponse,
         IServiceLineResponse,
         IServiceTypeResponse} from '../models/service.model';
import { IClientResponse } from '../models/client.model';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
    private _api: string = `${ environment.url_base }`;

  constructor( private http: HttpClient ) { }

  createService({...service}: ICreateServiceRequest ): Observable<ICreateServiceResponse> {
    if (service.moneda == "DOLAR"){
      service.valor_venta_dolar = service.valor_venta;
      service.valor_venta = service.valor_venta_dolar! * service.tasa_cambio!;

      service.costo_venta_dolar = service.costo_venta;
      service.costo_venta = service.costo_venta_dolar! * service.tasa_cambio!;
    }
    return this.http.post<ICreateServiceResponse>( `${ this._api }/services/create`, service );
  }

  getServiceLines(): Observable<IServiceLineResponse[]> {
    return this.http.get<IServiceLineResponse[]>( `${ this._api }/service-line/all` );
  }

  getClientsByCodUser(): Observable<IClientResponse[]> {
    return this.http.get<IClientResponse[]>( `${ this._api }/clients/user`, { headers: {'api': '3'} } );
  }

  getServiceTypeByCodServiceLine(codServiceLine: string): Observable<IServiceTypeResponse[]> {
    return this.http.get<IServiceTypeResponse[]>( `${ this._api }/service-type/service-line/${ codServiceLine }` );
  }

  getPaymentMethodsByServiceType(serviceType: string): Observable<IPaymentMethodResponse[]> {
    return this.http.get<IPaymentMethodResponse[]>( `${ this._api }/payment-method/${ serviceType }` );
  }

  getExchangeRate(): Observable<IExchangeRateResponse> {
    return this.http.get<IExchangeRateResponse>( `${ this._api }/period/last-period` );
  }

}
