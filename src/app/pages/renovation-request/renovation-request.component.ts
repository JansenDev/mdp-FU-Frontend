import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatRadioButton } from '@angular/material/radio';
import { IGetRenovationData } from 'src/app/core/models/contract-renovation.model';
import { ContractRenovationService } from 'src/app/core/services/contract-renovation.service';

@Component({
  selector: 'app-renovation-request',
  templateUrl: './renovation-request.component.html',
  styleUrls: ['./renovation-request.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RenovationRequestComponent implements OnInit {
  @ViewChild('contratoNuevo') contratoNuevo!: ElementRef;
  @ViewChild('mismasCondiciones') mismasCondRadio!: MatRadioButton;
  @ViewChild('cambioContractual') cambioContractRadio!: MatRadioButton;


  nvaModalidad: boolean = false;
  nvoSueldo: boolean = false;
  nvoBono: boolean = false;
  nvoPuesto: boolean = false;
  nvoNivel: boolean = false;
  idContract: number = 0;
  typeRequest: string = "";
  formRenovationRequest: FormGroup;

  formData: any = {
    nro_documento: 0,
    nombres: "",
    nombre_corto: "",
    empresa: "",
    modalidad: "",
    remuneracion: "",
    bono_men: "",
    fecha_fin_ant: "",
    fecha_inicio_nuevo: "",
    puesto: "",
    nivel: "",
    modalidad_bono: "",
    linea_negocio: "",
    motivo_rechazo: ""
  }

  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private contractRenovationService:ContractRenovationService,
    private cd: ChangeDetectorRef,) {
      let route = this.router.getCurrentNavigation();
      this.idContract = route?.extras.state != undefined ? route.extras.state['id'] : undefined;
      this.typeRequest = route?.extras.state != undefined ? route.extras.state['tipo_solicitud'] : undefined;
      this.formRenovationRequest = this.formBuilder.group({
          inputClient: ['', null],
          
      })
  }

  ngOnInit(): void {
    this.getFields()
  }
  
  ngAfterViewInit(): void {
    this.checkSameConditions();
    //Se llama a la detección de cambios después de actualizar los valores para
    //evitar el error NG0100: Expression has changed after it was checked
    this.cd.detectChanges();
  }

  checkSameConditions(): void {
    if (this.mismasCondRadio){
      this.mismasCondRadio.checked = true;
    }
  }

  acceptRenovation() {
    console.log("Se acepta la renovación", this.formData)
  }

  refuseRenovation() {
    this.contractRenovationService.refuseRenovation(this.idContract)
    .subscribe(data => {
      console.log("datos de rechazo de renovación", data);
    })
  }
  
  getFields() {
    this.contractRenovationService.getRenovationFields(this.idContract)
    .subscribe(data => {
      console.log("datos de renovación", data);
      this.formData = data;
    })
  }
}
