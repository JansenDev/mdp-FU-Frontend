import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-contract-renovation-request',
  templateUrl: './contract-renovation-request.component.html',
  styleUrls: ['./contract-renovation-request.component.scss']
})
export class ContractRenovationRequestComponent implements OnInit, AfterViewInit {
  @ViewChild('contratoNuevo') contratoNuevo!: ElementRef;
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

  constructor(private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log('dialog data: ', this.data);
  }

  ngAfterViewInit(): void {
      this.checkSameConditions();
      this.focusNewContract();

      //Se llama a la detección de cambios después de actualizar los valores para
      //evitar el error NG0100: Expression has changed after it was checked
      this.cd.detectChanges();

  }

  focusNewContract(): void {
      this.contratoNuevo.nativeElement.focus(); //Hacer foco en el input de fecha de contrato nuevo.
  }

  checkSameConditions(): void {
    if (this.mismasCondRadio){
      this.mismasCondRadio.checked = true;
    }
  }

  /* initCheckboxes(): void {
    if (this.nvaModalidad){
      this.nvaModalidad.checked = false;
    }
  } */

}
