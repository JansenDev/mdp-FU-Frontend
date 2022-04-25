import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicesService } from 'src/app/core/services/services.service';
@Component({
  selector: 'app-service-map',
  templateUrl: './service-map.component.html',
  styleUrls: ['./service-map.component.scss']
})
export class ServiceMapComponent implements OnInit {
  
  public clients : any;
  public lines : any;

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
  ];
  constructor(private service : ServicesService) {

  }

  ngOnInit(): void {
  }

  ngSubmit() {

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

}
