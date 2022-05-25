import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatRadioButton } from '@angular/material/radio';
import { IGetRenovationData } from 'src/app/core/models/contract-renovation.model';

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

  constructor(private formBuilder: FormBuilder,) {
      this.formRenovationRequest = this.formBuilder.group({
          inputClient: ['', null],
          
      })
  }

  ngOnInit(): void {
  }

  acceptRenovation() {
    console.log("Se acepta la renovación", this.formData)
  }
}
