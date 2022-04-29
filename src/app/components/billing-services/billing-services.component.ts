import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { BillingServicesService } from 'src/app/core/services/billing-services.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { IndividualConfig, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-billing-services',
  templateUrl: './billing-services.component.html',
  styleUrls: ['./billing-services.component.scss']
})


export class BillingServicesComponent implements OnInit {
  public hitos = [];
  public nameHito = '';
  public startDate = '';
  public endDate = '';
  public hours = '';
  public amount = '';
  public isUpdate = false;
  public cod_hito = null;
  public numero_hito = null;
  private monto_total = 0;
  private horas_total = 0;
  private suma_total = 0;
  private suma_horas = 0;
  private amountRow = 0
  private lastRowSelected : any;

  @Input() subject!: Subject<any>;
  sentService: any | null = '';
  cod_servicio: number = 0;
  disableBilling: boolean = true;
  @ViewChild(MatPaginator)
  paginator: MatPaginator = {} as MatPaginator;
  dataSource: MatTableDataSource<any> =
    new MatTableDataSource<any>([]);

    displayedColumns: string[] = [
    'numero_hito',
    'descripcion_hito',
    'horas',
    'monto',
    'fecha_inicio',
    'fecha_fin',
    'actions'
  ];

  isIncorrectDate = false;
  startDateService = '';
  endDateService = '';
  isIncorrectStartDateService = false;
  isIncorrectStartDateEndDateService = false;
  isIncorrectEndDateService = false;
  isIncorrectStartDate = false;
  isIncorrectEndDate = false;
  isIncorrectEndDateStartDateService = false;
  
  isIncorrectHour = false;
  isIncorrectAmount = false;

  resourceForm: FormGroup;
  constructor(private service : BillingServicesService,
    private formBuilder : FormBuilder, private notificationService: NotificationService, private toastrService: ToastrService) {
      this.resourceForm = this.formBuilder.group({
        cod_servicio: [''],
        nameHito: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        hours: ['', Validators.required],
        amount: ['', Validators.required],
      });
     }

  ngOnInit(): void {
    this.getHitos(); // obtención de los hitos de la tabla
    this.disableForm();
    console.log("this.subjectt", this.subject);
    this.subject.subscribe((data: any) => {
      this.sentService = data;
      console.log("el servicio de subject", data);
      this.cod_servicio = data.cod_servicio;
      this.disableBilling = 
        (data.disableBilling == null || data.disableBilling == undefined) 
        ? this.disableBilling 
        : data.disableBilling;

      if(this.disableBilling) {
        this.disableForm();
      } else {
        this.enableForm();
      }
      if(this.sentService != null) {
        this.startDateService = data.fecha_ini_real != null 
          ? data.fecha_ini_real 
          : data.fecha_ini_planificada;
        this.endDateService = data.fecha_fin_real != null 
        ? data.fecha_fin_real 
        : data.fecha_fin_planificada;  
        this.monto_total = data.valor_venta_sol != null ? data.valor_venta_sol : data.valor_venta 
        this.horas_total = data.horas_venta
        this.disableBilling = false;
        this.enableForm();
        this.cod_servicio = data.cod_servicio;
        this.getHitos();
      }
      this.getHitos()
    })
    
    this.validateForm();

  }

  ngSubmit():void {
    let {
      nameHito,
      start_date,
      end_date,
      hours,
      amount,
    }: any = this.resourceForm.value;

    console.log("this.resourceValue",this.resourceForm.value)

    this.registerHito()
    console.log("last row en ngsubmit", this.lastRowSelected);
    this.getHitos()
  }

  validateForm() {
    this.validateDate()
    this.validateHour()
    this.validateAmount()
  }

  validateDate() {
    this.resourceForm.controls['start_date'].valueChanges.subscribe(data => {
      if(!this.isIncorrectStartDate && !this.isIncorrectStartDateEndDateService) {
        if(data != null && data != '') {
          if(this.resourceForm.controls['start_date'].value < this.startDateService) {
            this.resourceForm.controls['start_date'].setErrors({error: true});
            this.isIncorrectStartDateService = true;
          } else {
            this.isIncorrectStartDateService = false;
            this.resourceForm.controls['start_date'].setErrors(null);
          }
        }
      }
    });

    this.resourceForm.controls['start_date'].valueChanges.subscribe(data => {
      if(!this.isIncorrectStartDateService && !this.isIncorrectStartDateEndDateService) {
        if(data != null && data != '') {
          if(this.resourceForm.controls['start_date'].value < this.resourceForm.controls['end_date'].value) {
            this.resourceForm.controls['start_date'].setErrors({error: true});
            this.isIncorrectStartDate = true;
          } else {
            this.isIncorrectStartDate = false;
            this.resourceForm.controls['start_date'].setErrors(null);
          }
        }
      }
    });

    this.resourceForm.controls['start_date'].valueChanges.subscribe(data => {
      if(!this.isIncorrectStartDateService && !this.isIncorrectStartDate) {
        if(data != null && data != '') {
          if(this.resourceForm.controls['start_date'].value >= this.endDateService) {
            this.resourceForm.controls['start_date'].setErrors({error: true});
            this.isIncorrectStartDateEndDateService = true;
          } else {
            this.isIncorrectStartDateEndDateService = false;
            this.resourceForm.controls['start_date'].setErrors(null);
          }
        }
      }
    });

    this.resourceForm.controls['end_date'].valueChanges.subscribe(data => {
      if(!this.isIncorrectEndDate && !this.isIncorrectEndDateStartDateService) {
        if(data != null && data != '') {
          if(this.resourceForm.controls['end_date'].value > this.endDateService) {
            this.resourceForm.controls['end_date'].setErrors({error: true});
            this.isIncorrectEndDateService = true;
          } else {
            this.isIncorrectEndDateService = false;
            this.resourceForm.controls['end_date'].setErrors(null);
          }
        }
      }
    });

    this.resourceForm.controls['end_date'].valueChanges.subscribe(data => {
      if(!this.isIncorrectEndDateService && !this.isIncorrectEndDateStartDateService) {
        if(data != null && data != '') {
          if(this.resourceForm.controls['end_date'].value <= this.resourceForm.controls['start_date'].value) {
            this.resourceForm.controls['end_date'].setErrors({error: true});
            this.isIncorrectEndDate = true;
          } else {
            this.isIncorrectEndDate = false;
            this.resourceForm.controls['end_date'].setErrors(null);
          }
        }
      }
    });

    this.resourceForm.controls['end_date'].valueChanges.subscribe(data => {
      if(!this.isIncorrectEndDate && !this.isIncorrectEndDateService) {
        if(data != null && data != '') {
          if(this.resourceForm.controls['end_date'].value < this.startDateService) {
            this.resourceForm.controls['end_date'].setErrors({error: true});
            this.isIncorrectEndDateStartDateService = true;
          } else {
            this.isIncorrectEndDateStartDateService = false;
            this.resourceForm.controls['end_date'].setErrors(null);
          }
        }
      }
    });
  }

  validateHour() {
    this.resourceForm.controls['hours'].valueChanges.subscribe(data => {
      let row_hours = 0
      if(this.lastRowSelected && this.lastRowSelected.horas)
        row_hours = this.lastRowSelected.horas;
      console.log("validate sumatotal", this.horas_total)
      console.log("row_hours", row_hours);
      if(this.suma_horas + this.resourceForm.controls['hours'].value - row_hours > this.horas_total) {
        this.resourceForm.controls['hours'].setErrors({error: true});
        this.isIncorrectHour = true;
        return;
      } else {
        this.isIncorrectHour = false;
        this.resourceForm.controls['hours'].setErrors(null);
      }
    });
  }

  validateAmount() {
    this.resourceForm.controls['amount'].valueChanges.subscribe(data => {
      let row_amount = 0;
      if(this.lastRowSelected && this.lastRowSelected.monto)
        row_amount = this.lastRowSelected.monto;
      if(this.suma_total + this.resourceForm.controls['amount'].value - row_amount > this.monto_total) {
        this.resourceForm.controls['amount'].setErrors({error: true});
        this.isIncorrectAmount = true;
        return;
      } else {
        this.isIncorrectAmount = false;
        this.resourceForm.controls['amount'].setErrors(null);
      }
    });
  }

  registerHito() {
    
    if (this.isUpdate == false) { // Si es registrar
      console.log("**************ES REGISTRAR**************")
      console.log("registrar monto", this.suma_total, this.resourceForm.value.amount, this.monto_total);
      console.log("registrar horas", this.horas_total, this.resourceForm.value.hours, this.horas_total);
      // if(this.suma_total + this.resourceForm.value.amount > this.monto_total) {
      //   return;
      // }
      // if(this.suma_horas + this.resourceForm.value.hours >= this.horas_total) {
      //   alert("No debe exceder la hora");
      //   return;
      // }
      // if(this.resourceForm.value.start_date >= this.resourceForm.value.end_date) {
      //   alert("La fecha de inicio debe ser menor a la fecha de fin");
      //   return;
      // }
      let input = {
        "cod_servicio": this.cod_servicio,
        "descripcion_hito": this.resourceForm.value.nameHito,
        "fecha_inicio": this.resourceForm.value.start_date,
        "fecha_fin": this.resourceForm.value.end_date,
        "horas": this.resourceForm.value.hours,
        "monto": this.resourceForm.value.amount
      };
      console.log("input register", input);
      this.service.registerHito(input).subscribe(data => {
        console.log("data registerHito", data);
        this.getHitos();
      });
    } else { // Si es actualizar
      console.log("ES ACTUALIZAR")
      console.log("actualizar monto menos row", this.suma_total, this.lastRowSelected.monto, this.resourceForm.value.amount, this.monto_total);
      console.log("actualizar horas menos row", this.horas_total, this.lastRowSelected.horas, this.resourceForm.value.hours, this.horas_total);
      // if(this.suma_total - this.lastRowSelected.monto + this.resourceForm.value.amount > this.monto_total) {
      //   alert("No debe exceder el monto total");
      //   return;
      // }
      // if(this.horas_total - this.lastRowSelected.horas + this.resourceForm.value.hours > this.horas_total) {
      //   alert("No debe exceder las horas venta");
      //   return;
      // }
      // if(this.resourceForm.value.start_date >= this.resourceForm.value.end_date) {
      //   alert("La fecha de inicio debe ser menor a la fecha de fin");
      //   return;
      // }
      this.isUpdate = false;
      let input = {
        "cod_hito": this.cod_hito,
        "numero_hito": this.numero_hito,
        "descripcion_hito": this.resourceForm.value.nameHito,
        "horas": this.resourceForm.value.hours,
        "monto": this.resourceForm.value.amount,
        "fecha_inicio": this.resourceForm.value.start_date,
        "fecha_fin": this.resourceForm.value.end_date
      }
      console.log("input de actualizar", input);
      this.service.updateHito(input).subscribe(data => {
        console.log("data de actualizar", data);
        this.getHitos()
      });
    }
    this.resourceForm.controls['nameHito'].setValue(null)
    this.resourceForm.controls['hours'].setValue(null)
    this.resourceForm.controls['amount'].setValue(null)
    this.resourceForm.controls['start_date'].setValue(null)
    this.resourceForm.controls['end_date'].setValue(null)
    
    this.resourceForm.controls['nameHito'].setErrors(null);
    // this.resourceForm.controls['hours'].setErrors(null);
    // this.resourceForm.controls['amount'].setErrors(null);
    this.resourceForm.controls['start_date'].setErrors(null);
    this.resourceForm.controls['end_date'].setErrors(null);
  }

   getHitos() {
    let input = {
      "cod_servicio" : this.cod_servicio
    }
    console.log("impresion del input de cod_servicio", input);
    this.service.getHitos(input).subscribe(data => {
      console.log("GET HITOS", data);
      this.dataSource = new MatTableDataSource<any>(data);
      this.hitos = data;
      this.suma_total = this.sumMontos(data);
      this.suma_horas = this.sumHoras(data);
      this.dataSource.paginator = this.paginator;
      console.log("SUMA TOTAL DE LOS HITOS = ", this.suma_total);
      console.log("SUMA TOTAL DE LAS HORAS = ", this.suma_horas);
    });
  }
  sumMontos(data : any) {
    let suma = 0;
    for(let i = 0; i < data.length; i++)
      suma += parseInt(data[i].monto);
    return suma;
  }

  sumHoras(data : any) {
    let horas = 0;
    for(let i = 0; i < data.length; i++)
      horas += parseInt(data[i].horas);
    return horas;
  }

  updateHito(element : any) {
    this.resourceForm.controls['nameHito'].setValue(element.descripcion_hito);
    this.resourceForm.controls['start_date'].setValue(element.fecha_inicio);
    this.resourceForm.controls['end_date'].setValue(element.fecha_fin);
    this.resourceForm.controls['hours'].setValue(Number(element.horas));
    this.resourceForm.controls['amount'].setValue(Number(element.monto));
    this.isUpdate = true;
    this.cod_hito = element.cod_hito;
    this.numero_hito = element.numero_hito;
    this.amountRow = element.amount;
    this.lastRowSelected = element;
    console.log("this.lastrow", this.lastRowSelected);
    console.log("editando", element);
    this.isIncorrectDate = false;
    this.isIncorrectStartDateService = false;
    this.isIncorrectStartDateEndDateService = false;
    this.isIncorrectEndDateService = false;
    this.isIncorrectStartDate = false;
    this.isIncorrectEndDate = false;
    this.isIncorrectEndDateStartDateService = false;
    let row_hours = this.lastRowSelected.horas;
    if(this.suma_horas + this.resourceForm.controls['hours'].value - row_hours > this.horas_total) {
      this.isIncorrectHour = true;
    } else {
      this.isIncorrectHour = false;
    }
  }

  deleteHito(element : any) {
    let input = {
      "cod_hito": element.cod_hito
    }
    this.service.deleteHito(input).subscribe(data => {
      console.log("eliminando", data);
      this.getHitos();
    });
  }

  enableForm() {
    this.resourceForm.controls['nameHito'].enable();
    this.resourceForm.controls['start_date'].enable();
    this.resourceForm.controls['end_date'].enable();
    this.resourceForm.controls['hours'].enable();
    this.resourceForm.controls['amount'].enable();
  }

  disableForm() {
    this.resourceForm.controls['nameHito'].disable();
    this.resourceForm.controls['start_date'].disable();
    this.resourceForm.controls['end_date'].disable();
    this.resourceForm.controls['hours'].disable();
    this.resourceForm.controls['amount'].disable();
  }
}
