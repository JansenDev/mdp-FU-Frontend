import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SummaryService } from '../../core/services/summary.service';
import { ISummaryResponse } from '../../core/models/summary.model';
import { IResourceResponse } from '../../core/models/resource.model';
import { ThisReceiver } from '@angular/compiler';

// declare var me : any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  public customer: string = '';
  public clm_effective: number = 0;
  public production: number = 0;
  public productivity: number = 0;
  public period: string = "";
  public summary: any = {};
  public show: boolean = false;

  constructor(private service: SummaryService) {}

  ngOnInit() {
  }

  async getSummary(nameClient : any, periodoToSummary : any, namePerfil : any, idClient : any, nombres : any) {
    console.log("que me pasa jhonathan", nameClient, periodoToSummary, namePerfil, idClient);
    // let input = {"cod_cliente": 1, "periodo": "03-2022"};
    let input = {"cod_cliente": idClient, "periodo": periodoToSummary, "perfil": namePerfil, "nombres": nombres};
    console.log("Input", input);
    await this.service.getPrueba(input).subscribe(data => {
      console.log("PRUEBA DE DATA CARLOS: ", data);
      this.summary = data;
      this.customer = nameClient;
      this.clm_effective = this.summary.clm_efectivo;
      this.production = this.summary.produccion;
      this.productivity = this.summary.productividad;
      this.period = periodoToSummary;
    });
  }
}
