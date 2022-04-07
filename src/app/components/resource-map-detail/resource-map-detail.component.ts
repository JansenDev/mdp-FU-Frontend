import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { ResourceDetailService } from 'src/app/core/services/resource-detail.service';
import { Assignment } from 'src/app/core/models/assignment.model';
import { Contract } from 'src/app/core/models/contract.model';
import { Productivity } from 'src/app/core/models/productivity.model';

@Component({
  selector: 'app-resource-map-detail',
  templateUrl: './resource-map-detail.component.html',
  styleUrls: ['./resource-map-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResourceMapDetailComponent implements OnInit {

  constructor(private resourceDetailService: ResourceDetailService) {  }
  @Input() cod_colaborador = 0;
  @Input() showDetail = false;
  @Input() cod_mapa_recurso = null;
  @Output() closed = new EventEmitter();
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
    capacity: 0
  }

  contract: Contract = {
    codColaborador: 0,
    nroDocumento: "",
    nombres: "",
    apellidoPat: "",
    apellidoMat: "",
    sueldoPlanilla: "",
    bono: "",
    eps: "",
    clm: "",
    codContrato: 4,
    modalidad: "",
    fechaFin: new Date()
  };

  assignments: Assignment[] = [];
  tableData: Assignment[] = [];
  columnsToDisplay = ['service', 'name', 'percentage', 'start', 'end'];

  ngOnInit(): void {
    /* this.loadContract(this.cod_colaborador, endDate);
    this.loadAssignments(id, startDate, endDate); */
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
    console.log(this.showDetail);
  }

  closeDetail() {
    this.showDetail = false;
    this.closed.emit();
  }

  loadProductivity(id: number){
    this.resourceDetailService.getResourceProductivityByCode(id)
      .subscribe(productivityData => {
        console.log('productivity: ', productivityData);
        this.productivity = productivityData;
      }, error => {
        console.error(error);
      })
  }

  loadContract(id: number, endDate: string){
    this.resourceDetailService.getContractByCollaboratorIdAndEndDate(id, endDate)
      .subscribe(contractData => {
        console.log(contractData);
        this.contract = contractData;
      }, error => {
        console.error(error);
      })
  }

  loadAssignments(id: number, startDate: string, endDate: string){
    this.resourceDetailService.getAssigmentsByCollaboratorCodeAndDates(id, startDate,
      endDate)
        .subscribe(assignmentData => {
          console.log(assignmentData);
          this.assignments = assignmentData;
        }, error => {
          console.error(error);
        })
  }

  //obtener el detalle
  /* loadDetail(id: number){
    this.resourceDetailService.getMockDetail(id)
    .subscribe(data => {
      console.log('fetched data: ', data);
      this.productivity = data["productividad"];
      this.contract = data["contrato"];
      this.assignments = data["asignaciones"];
      this.tableData = this.assignments;
      console.log('fetched prod: ', this.productivity);
      console.log('fetched contract: ', this.contract);
      console.log('fetched assignments: ', this.assignments);
    }, error => {
      console.error(error);
    })
  } */
}
