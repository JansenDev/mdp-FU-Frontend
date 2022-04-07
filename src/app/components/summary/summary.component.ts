import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SummaryService } from '../../core/services/summary.service';
import { ISummaryResponse } from '../../core/models/summary.model';
import { IResourceResponse } from '../../core/models/resource.model';

// declare var me : any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  // private summary: ISummaryResponse = {"customer":"Fallo","clm_effective": 0,"production": 0,"productivity": 0,"period": new Date(1648721412)};
  private resourceMap: any = [
    {
      "linea_negocio": "ATIS",
      "estado": "C",
      "nombre_perfil": "Jefe de Delivery",
      "nivel": "Semisenior",
      "fecha_inicio": "2021-04-06",
      "fecha_fin": "2021-08-25",
      "asignacion": 100,
      "clm_efectivo": "2221.00",
      "produccion": "1035.00",
      "productividad": "2.14",
      "nombre_colaborador": "Aldridge McAllaster Curnock"
    },
    {
      "linea_negocio": "ATIS",
      "estado": "C",
      "nombre_perfil": "Jefe de Recursos Humanos",
      "nivel": "Senior",
      "fecha_inicio": "2021-05-08",
      "fecha_fin": "2021-07-23",
      "asignacion": 75,
      "clm_efectivo": "2994.00",
      "produccion": "1384.00",
      "productividad": "2.16",
      "nombre_colaborador": "Ninetta Randle Giorgio"
    },
    {
      "linea_negocio": "PRY",
      "estado": "A",
      "nombre_perfil": "Gerente Finanzas",
      "nivel": "Senior",
      "fecha_inicio": "2021-08-18",
      "fecha_fin": "2022-01-20",
      "asignacion": 100,
      "clm_efectivo": "2122.00",
      "produccion": "1909.00",
      "productividad": "1.11",
      "nombre_colaborador": "Hanny Lamyman Fydo"
    },
    {
      "linea_negocio": "ATIS",
      "estado": "A",
      "nombre_perfil": "Jefe de Delivery",
      "nivel": "Junior",
      "fecha_inicio": "2021-04-01",
      "fecha_fin": "2022-02-23",
      "asignacion": 50,
      "clm_efectivo": "2136.00",
      "produccion": "1256.00",
      "productividad": "1.70",
      "nombre_colaborador": "Vivienne McGeachie McQuade"
    }];
  public customer: string = "";
  public clm_effective: number = 0;
  public production: number = 0;
  public productivity: number = 0;
  public period: Date = new Date();
  public summary: any = {}; //{"data":{"customer":"Fallo","clm_effective":13.85,"production":99.99,"productivity":9999.99,"period":1648721412}};

  @Input() periodo: string = '';
  @Input() cod_cliente: number | null = null;

  // public summary: any = {}; //{"data":{"customer":"Fallo","clm_effective":13.85,"production":99.99,"productivity":9999.99,"period":1648721412}};


  constructor(private service: SummaryService) {
  }


  ngOnInit() {
    this.getSummary();
    this.getResourceMap();
    this.getPrueba();
  }

  getSummary() {
    this.service.getSummary().subscribe((data) => {
      this.summary = data;
      this.customer = this.summary.customer;
      this.clm_effective = this.summary.clm_effective;
      this.production = this.summary.production;
      this.productivity = this.summary.productivity;
      this.period = this.summary.period;
    }), (err: any) => {
      console.error(err);
    }
  }

  getResourceMap() {
    this.service.getResourceMap().subscribe(data => {
      this.resourceMap = data;
      // console.log("mapa recursos:", this.resourceMap);
    })
  }

  getPrueba() {
    this.service.getPrueba().subscribe(data => {
      // console.log("PRUEBA DE DATA CARLOS: ", data);
    })
  }
}
