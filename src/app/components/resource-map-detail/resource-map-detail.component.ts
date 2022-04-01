import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ResourceDetailService } from 'src/app/core/services/resource-detail.service';
import { ResourceAssignment } from 'src/app/core/model/resource-assignment.model';
import { Contract } from 'src/app/core/model/contract.model';
import { Service } from 'src/app/core/model/service.model';
import { Detail } from 'src/app/core/model/resource-detail.model';
import { Collaborator } from 'src/app/core/model/collaborator.model';

export interface AssignedService {
    type: string,
    name: string,
    percentage: number,
    start: Date,
    end: Date
}

@Component({
  selector: 'app-resource-map-detail',
  templateUrl: './resource-map-detail.component.html',
  styleUrls: ['./resource-map-detail.component.scss']
})
export class ResourceMapDetailComponent implements OnInit {

  constructor(private resourceDetailService: ResourceDetailService) {  }
  showDetail = true; //TODO: dejar en false
  currentTab = 0;
  apiData = {
    horasServicio: 0,
  licencias: 0,
  faltas: 0,
  vacaciones: 0,
  horasExtras: 0,
  totalHorasAsignaciones: 0,
  totalHorasFacturables: 0,
  eficiencia: 0,
  rendimiento: 0,
  capacity: 0,
  clm: 0,
  fechaFinContrato: "",
  colaborador: {
    codColaborador: 1,
    nombres: "",
    apellidoPat: "",
    apellidoMat: "",
    servicios: [
      {
        tipoServicio: "",
        descripcionServicio: "",
        AsignacionRecurso: {
          porAsignacion: 0,
          fechaInicio: "",
          fechaFin: ""
        }
      }
    ],
    contratos: [
      {
        codContrato: 1,
        modalidad: "",
        fechaFin: "",
        sueldoPlanilla: 0,
        bono: 0,
        eps: 0,
        clm: 0
      }
    ]
  },
  id: 0
  };
  detail = {};
  contracts: Contract[] = [];
  services = [];
  collaborator: Collaborator = {
    codColaborador: 0,
    nombres: '',
    apellidoPat: '',
    apellidoMat: '',
    servicios: []
  };
  resourceAssignment = {};

  tableData: AssignedService[] = [
    {
      type: 'PRY',
      name: 'Proyecto1',
      percentage: 50,
      start: new Date('03-14'),
      end: new Date('05-16')
    },
    {
      type: 'RQ',
      name: 'Requerimiento3',
      percentage: 50,
      start: new Date('03-30'),
      end: new Date('05-10')
    }
  ]
  columnsToDisplay = ['service', 'name', 'percentage', 'start', 'end'];

  ngOnInit(): void {
    console.log(this.currentTab);
    this.loadDetail(1);
  }

  toggleDetail(){
    this.showDetail = !this.showDetail;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    //console.log('index = ', tabChangeEvent.index);
    this.currentTab = tabChangeEvent.index;
    console.log(this.currentTab);
  }

  loadDetail(id: number){
    this.resourceDetailService.getDetail(id)
    .subscribe(data => {
      console.log('fetched data: ', data);
      this.apiData = data;
      this.collaborator = data["colaborador"]
      this.contracts = data["colaborador"]["contratos"];
      this.services = data["colaborador"]["servicios"];
      //this.services.forEach(service => servce["Asigna"])
      console.log('fetched contracts: ', this.contracts);
      console.log('fetched collab: ', this.collaborator);
      console.log('fetched services: ', this.services);

    }, error => {
      console.error(error);
    })
  }
}
