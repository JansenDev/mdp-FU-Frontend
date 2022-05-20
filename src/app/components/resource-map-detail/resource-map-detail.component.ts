import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { ResourceDetailService } from 'src/app/core/services/resource-detail.service';
import { Assignment } from 'src/app/core/models/assignment.model';
import { Contract } from 'src/app/core/models/contract.model';
import { Productivity } from 'src/app/core/models/productivity.model';
import { IPeriodResponse } from 'src/app/core/models/period.model';

@Component({
  selector: 'app-resource-map-detail',
  templateUrl: './resource-map-detail.component.html',
  styleUrls: ['./resource-map-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResourceMapDetailComponent implements OnInit {

  constructor(private resourceDetailService: ResourceDetailService) {  }
  @Input() showDetail = false;
  @Input() cod_colaborador = 0;
  @Input() cod_mapa_recurso = null;
  @Output() closed = new EventEmitter(); //Emitter para mandar el valor de cerrar detalle de vuelta al padre
  currentTab = 0;

  productivity: Productivity = {
    eficiencia: "",
    rendimiento: "",
    horas_servicio: 0,
    licencias: 0,
    faltas: 0,
    vacaciones: 0,
    horas_extras: 0,
    total_horas_asignaciones: 0,
    total_horas_facturables: 0,
    capacity: 0,
    estado: ""
  }

  contract: Contract = {
    cod_colaborador: 0,
    nro_documento: "",
    nombres: "",
    apellido_pat: "",
    apellido_mat: "",
    sueldo_planilla: "",
    bono: "",
    eps: "",
    clm: "",
    cod_contrato: 0,
    modalidad: "",
    fecha_fin: new Date()
  };

  periodStatusSelected = '';

  assignments: Assignment[] = [];
  tableData: Assignment[] = [];
  columnsToDisplay = ['service', 'name', 'percentage', 'start', 'end'];

  ngOnInit(): void {}

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }

  closeDetail() {
    this.showDetail = false;
    this.closed.emit();
  }

  loadProductivity(id: number){
    this.resourceDetailService.getResourceProductivityByCode(id)
      .subscribe(productivityData => {
        this.productivity = productivityData;
      }, error => {
        console.error(error);
      })
  }

  loadContract(id: number, period: string, estatus: string){
    this.resourceDetailService.getContractByCollaboratorIdAndPeriod(id, period)
      .subscribe(contractData => {
        this.contract = contractData;
      }, error => {
        console.error(error);
      })
    this.periodStatusSelected = estatus;
  }

  loadAssignments(id: number, period: string, clientId: number){
    this.resourceDetailService.getAssigmentsByCollabCodePeriodAndClientCode(id, period,
      clientId)
        .subscribe(assignmentData => {
          this.assignments = assignmentData;
          this.tableData = this.assignments;
        }, error => {
          console.error(error);
        })
  }

  //obtener el detalle
  /* loadDetail(id: number){
    this.resourceDetailService.getMockDetail(id)
    .subscribe(data => {
      // console.log('fetched data: ', data);
      this.productivity = data["productividad"];
      this.contract = data["contrato"];
      this.assignments = data["asignaciones"];
      this.tableData = this.assignments;
      // console.log('fetched prod: ', this.productivity);
      // console.log('fetched contract: ', this.contract);
      // console.log('fetched assignments: ', this.assignments);
    }, error => {
      console.error(error);
    })
  } */
}
