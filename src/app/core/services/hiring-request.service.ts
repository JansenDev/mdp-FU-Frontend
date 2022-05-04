import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHiringRequest } from '../models/hiring-request.model';
import { IStatusRequestSimple } from '../models/status-request-simple.model';

const { url_base } = environment;

@Injectable({
  providedIn: 'root',
})
export class HiringRequestService {
  constructor(private httpClient: HttpClient) {}

  registerHiringRequest(hiringContractBody: IHiringRequest) {
    const URL = `${url_base}/contractSolicitude/newSolicitude`;

    let hiringRequest: IHiringRequest = {
      ...hiringContractBody,
    };

    const {
      cod_eps,
      eps_parcial_total,
      ind_sctr,
      bono_men,
      condicional_adicional,
      cod_linea_negocio,
    } = hiringContractBody;

    if (cod_eps) {
      hiringRequest['cod_eps'] = cod_eps;
      hiringRequest['eps_parcial_total'] = eps_parcial_total;
    } else {
      hiringRequest['cod_eps'] = undefined;
      hiringRequest['eps_parcial_total'] = undefined;
    }

    if (ind_sctr) {
      hiringRequest['ind_sctr'] = 'S';
    } else {
      hiringRequest['ind_sctr'] = 'N';
    }

    if (bono_men && bono_men) {
      hiringRequest['bono_men'] = bono_men;
    } else {
      hiringRequest['bono_men'] = undefined;
    }

    if (condicional_adicional) {
      hiringRequest['condicional_adicional'] = condicional_adicional;
    } else {
      hiringRequest['condicional_adicional'] = undefined;
    }

    if (cod_linea_negocio === 'ATIS') {
      hiringRequest['condicion_proyecto_area'] = undefined;
    }

    console.log('SERVICIO');
    console.log(hiringRequest);
    return this.httpClient.post<IStatusRequestSimple>(URL, hiringRequest);
  }

  uploadCv(fileCv: { file: any; filename: any }) {
    const URL = `${url_base}/uploadFile`;

    let body = new FormData();
    body.append('myFile', fileCv.file);

    console.log('myFile', fileCv.file, fileCv.filename);

    return this.httpClient.post<any>(URL, body);
  }

  getParameters(type: keyof IParameters = 'factor_planilla') {
    const URL = `${url_base}/parameter/${type}`;

    return this.httpClient.get<any>(URL);
  }
}

export interface IParameters {
  horas_dias: string;
  factor_planilla: string;
  factor_rxh_practicas: string;
}
