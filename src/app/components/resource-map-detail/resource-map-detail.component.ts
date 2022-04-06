import { Component, Input, OnInit } from '@angular/core';
import { ResourceDetailService } from 'src/app/core/services/resource-detail.service';
import { Assignment } from 'src/app/core/models/assignment.model';
import { Contract } from 'src/app/core/models/contract.model';
import { Productivity } from 'src/app/core/models/productivity.model';

@Component({
  selector: 'app-resource-map-detail',
  templateUrl: './resource-map-detail.component.html',
  styleUrls: ['./resource-map-detail.component.scss'],
})
export class ResourceMapDetailComponent implements OnInit {

  constructor(private resourceDetailService: ResourceDetailService) {  }
  @Input() cod_colaborador = null;
  @Input() showDetail = false;
  @Input() cod_mapa_recurso = null;
  currentTab = 0;

  productivity: Productivity = {
    eficiencia: "",
    rendimiento: "",
    horasServicio: 0,
    licencias: 0,
    faltas: 0,
    vacaciones: 0,
    horasExtra: 0,
    totalHorasAsignaciones: 0,
    totalHorasFacturables: 0,
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
    // console.log(this.currentTab);
    this.loadDetail(1);
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }

  //obtener el detalle
  loadDetail(id: number){
    this.resourceDetailService.getDetail(id)
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
  }
}
