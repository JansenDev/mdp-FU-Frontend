import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioButton } from '@angular/material/radio';
import { ICreateRenovationRequest, IGetRenovationData } from 'src/app/core/models/contract-renovation.model';
import { ContractRenovationService } from 'src/app/core/services/contract-renovation.service';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-contract-renovation-request',
  templateUrl: './contract-renovation-request.component.html',
  styleUrls: ['./contract-renovation-request.component.scss']
})
export class ContractRenovationRequestComponent implements OnInit, AfterViewInit {
  //@ViewChild('contratoNuevo') contratoNuevo!: ElementRef;
  @ViewChild('nvaFechaFinInput') nvaFechaFinInput!: ElementRef;
  @ViewChild('mismasCondiciones') mismasCondRadio!: MatRadioButton;
  @ViewChild('cambioContractual') cambioContractRadio!: MatRadioButton;

  //Valores iniciales de checkboxes
  nvaModalidad: boolean = false;
  nvoSueldo: boolean = false;
  nvoBono: boolean = false;
  nvoPuesto: boolean = false;
  nvoNivel: boolean = false;

  modes = [
    'Planilla',
    'RxH',
    'Practicante'
  ]

  formData: IGetRenovationData = {
    nro_documento: 0,
    nombres: "",
    nombre_corto: "",
    cod_linea_negocio: "",
    empresa: "",
    modalidad: "",
    remuneracion: "",
    bono_men: "",
    fecha_fin_ant: "",
    fecha_inicio_nuevo: "",
    puesto: "",
    nivel: "",
    modalidad_bono: "",
  }

  postData: ICreateRenovationRequest = {
    cod_mapa_recurso: 0,
    opcion_renovacion: "mismas condiciones",
    fecha_fin_nuevo: ""
  }

  minDate!: Date; //TODO: para validar fecha minima en el datepicker

  constructor(private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private contractRenovationService: ContractRenovationService,
              public datePipe: DatePipe,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    console.log('dialog data: ', this.data);
    this.postData.cod_mapa_recurso = this.data.codigo;
    this.getRenovationData(this.data.codigo);
  }

  ngAfterViewInit(): void {
      this.checkSameConditions();
      this.focusNewContract();

      //Se llama a la detección de cambios después de actualizar los valores para
      //evitar el error NG0100: Expression has changed after it was checked
      this.cd.detectChanges();

  }

  focusNewContract(): void {
      this.nvaFechaFinInput.nativeElement.focus(); //Hacer foco en el input de fecha de contrato nuevo.
  }

  checkSameConditions(): void {
    if (this.mismasCondRadio){
      this.mismasCondRadio.checked = true;
    }
  }

  //TODO: revisar
  getRenovationData(resourceMapId: number){
    this.contractRenovationService.autocompleteFields(resourceMapId)
      .subscribe(renovationData => {
        console.log('autocomp. datos: ', renovationData);
        this.formData = renovationData;
        let fechaIni = renovationData.fecha_inicio_nuevo;
        console.log('fecha ini:', fechaIni);
        this.minDate = new Date(fechaIni);
        this.minDate.setDate(this.minDate.getDate()+1); //TODO: Zona horaria? Retorna 1 día menos del esperado
        console.log(this.minDate);
      }, error => {
        console.error(error);
      })
  }

  createRenovationRequest(){
    if (this.postData.fecha_fin_nuevo){
      let formatted = this.datePipe.transform(this.postData.fecha_fin_nuevo, 'yyyy-MM-dd');
      this.postData.fecha_fin_nuevo = formatted;
      this.contractRenovationService.createRenovationRequest(this.postData)
        .subscribe(createdRequest => {
          console.log(createdRequest);
          this.notificationService.toast(
            'success',
            'Se creó la solicitud con éxito',
            'OK',
            5000
          )
        }, error => {
          console.log(error);
          this.notificationService.toast(
            'error',
            error.error.message,
            'ERROR',
            5000);
        })
    }
  }
}
