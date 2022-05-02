import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces
import { ICreateServiceRequest,
         ICreateServiceResponse,
         IExchangeRateResponse,
         IGetOneServiceMapResponse,
         IGetServiceResponse,
         IPaymentMethodResponse,
         IPostServiceRequest,
         IServiceLineResponse,
         IServiceTypeResponse} from '../models/service.model';
import { IClientResponse } from '../models/client.model';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private _api: string = `${ environment.url_base }`;

  constructor(
    private http: HttpClient,
    private  notificationService: NotificationService) { }

  createService({...service}: ICreateServiceRequest ): Observable<ICreateServiceResponse> {
    if (service.moneda == "DOLAR"){
      service.valor_venta_sol = service.valor_venta! * service.tasa_cambio!;
      service.costo_venta_sol = service.costo_venta! * service.tasa_cambio!;
    }
    if (service.moneda == 'SOL') {
      service.valor_venta_sol = service.valor_venta!;
      service.costo_venta_sol = service.costo_venta!;
    }
    service.prod_venta = service.valor_venta_sol! / service.costo_venta_sol! ;
    service.tarifa = service.valor_venta_sol! / service.horas_venta!;
    return this.http.post<ICreateServiceResponse>( `${ this._api }/services/create`, service )
    .pipe(
      map((res: ICreateServiceResponse) => {
        if (res) {
          this.notificationService.toast(
            'success',
            'Servicio creado satisfactoriamente',
            'Servicio',
            7000
          );
        }
        return res;
      })
    );
  }

  getServiceLines(): Observable<IServiceLineResponse[]> {
    return this.http.get<IServiceLineResponse[]>( `${ this._api }/service-line/all` );
  }

  getClientsByCodUser(): Observable<IClientResponse[]> {
    return this.http.get<IClientResponse[]>( `${ this._api }/clients/user`);
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

  findServices(filters: IPostServiceRequest): Observable<IGetServiceResponse[]> {
    return this.http.post<IGetServiceResponse[]>( `${ this._api }/services/get`, filters);
  }

  findOneServiceMap(codService: number): Observable<IGetOneServiceMapResponse> {
    return this.http.get<IGetOneServiceMapResponse>( `${ this._api }/services/assignments/payment-services/${ codService }`);
  }

  updateService(codService: number, body: ICreateServiceRequest): Observable<ICreateServiceResponse> {
    if (body.moneda == "DOLAR"){
      body.valor_venta_sol = body.valor_venta! * body.tasa_cambio!;
      body.costo_venta_sol = body.costo_venta! * body.tasa_cambio!;
    }
    if (body.moneda == 'SOL') {
      body.valor_venta_sol = body.valor_venta!;
      body.costo_venta_sol = body.costo_venta!;
    }
    body.prod_venta = body.valor_venta_sol! / body.costo_venta_sol! ;
    body.tarifa = body.valor_venta_sol! / body.horas_venta!;
    return this.http.put<ICreateServiceResponse>( `${ this._api }/services/update/${ codService }`, body ).pipe(
      map((res: ICreateServiceResponse) => {
        if (res) {
          this.notificationService.toast(
            'success',
            'Servicio actualizado!',
            'Servicio',
            7000
          );
        }
        return res;
      })
    );
  }

}
