import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IGetServiceResponse, IPostServiceRequest } from 'src/app/core/models/service.model';
import { ServicesService } from 'src/app/core/services/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-map',
  templateUrl: './service-map.component.html',
  styleUrls: ['./service-map.component.scss']
})
export class ServiceMapComponent implements OnInit {
  
  public clients : any;
  public lines : any;
  resourceForm: FormGroup;

  @ViewChild(MatPaginator)
  paginator: MatPaginator = {} as MatPaginator;
  dataSource: MatTableDataSource<any> =
    new MatTableDataSource<any>([]);
  
  displayedColumns: string[] = [
    'codigo',
    'nombre_servicio',
    'tipo_servicio',
    'etapa',
    'estado',
    'horas_venta',
    'valor_venta',
    'fecha_inicio_planificada',
    'fecha_fin_planificada',
    'fecha_inicio_real',
    'fecha_fin_real',
    'horas_planificada',
    'valor_venta_planificada',
    'horas_ejecutadas',
    'produccion_ejecutada',
    'actions',
  ];
  constructor(private service : ServicesService, private formBuilder : FormBuilder) {
    this.resourceForm = this.formBuilder.group({
      cboxClient: ['', Validators.required],
      cboxLine: ['', Validators.required],
      cboxState: ['', Validators.required],
    });
  }
  services: IGetServiceResponse[] = [];


  ngOnInit(): void {
    this.getClients();
    this.getServicesLine();
  }

  findServices(filters: any): void {
    this.service.findServices(filters).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      // this.dataSource.data = res;
      this.dataSource.paginator = this.paginator
      console.log("findServices", this.dataSource.data);
    }, err => {
      console.log(err);
    });
  }

  ngSubmit() {
    let {
      cboxClient,
      cboxLine,
      cboxState,
    } = this.resourceForm.value;

    console.log("submiteando...");
    console.log("this.resourceForm.value", this.resourceForm.value);
    


    let input = {
      "cod_cliente": cboxClient,
      "cod_linea_negocio": cboxLine,
      "estado": cboxState
    }

    this.findServices(input);
    console.log("cliente combo", cboxClient);
    console.log("cliente linea", cboxLine);
    console.log("cliente estado", cboxState);
  }

  getClients() {
    this.service.getClientsByCodUser().subscribe(data => {
      console.log("clientes", data);
      this.clients = data;
    });
  }

  getServicesLine() {
    this.service.getServiceLines().subscribe( data => {
      console.log("lineas de negocio", data);
      this.lines = data;
    })
  }
  
  createService() {
    console.log("CREAR SERVICIO");
  }

  seeDetail(element : any) {
    console.log("element", element);
    localStorage.setItem("service", JSON.stringify(element));
  }
}
