import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { BillingServicesService } from 'src/app/core/services/billing-services.service';
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
  private monto_total = 1000000;
  private suma_total = 0;
  @Input() subject!: Subject<any>;
  cod_servicio: number = 0;
  @ViewChild(MatPaginator)
  paginator: MatPaginator = {} as MatPaginator;
  dataSource: MatTableDataSource<any> =
    new MatTableDataSource<any>([]);

  displayedColumns: string[] = [
    'cod_hito',
    'descripcion_hito',
    'horas',
    'monto',
    'fecha_inicio',
    'fecha_fin',
    'actions'
  ];


  resourceForm: FormGroup;
  constructor(private service : BillingServicesService,
    private formBuilder : FormBuilder) {
      this.resourceForm = this.formBuilder.group({
        cod_servicio: 11, // luego cambiar
        nameHito: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        hours: ['', Validators.required],
        amount: ['', Validators.required],
      });
     }

  ngOnInit(): void {
    let hitos = this.getHitos(); // obtención de los hitos de la tabla
    this.subject.subscribe((data: any) => {
      console.log("cod_servicio: ", data);
    })
  }

  ngSubmit():void {
    //this.registerHito();
    console.log("enviando datos a Carlos...")
    let {
      nameHito,
      start_date,
      end_date,
      hours,
      amount,
    }: any = this.resourceForm.value;

    console.log("this.resourceValue",this.resourceForm.value)

    this.registerHito()
    this.getHitos()
  }

  registerHito() {
    if (this.isUpdate == false) { // Si es registrar
      if(this.suma_total + this.resourceForm.value.amount >= this.monto_total) {
        alert("No debe exceder la suma");
        return;
      }
      let input = {
        "cod_servicio": this.resourceForm.value.cod_servicio,
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
      this.isUpdate = false;
      if(this.suma_total >= this.monto_total) {
        alert("No debe exceder la suma");
        return;
      }
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
    this.resourceForm.controls['nameHito'].setValue("");
    this.resourceForm.controls['start_date'].setValue("");
    this.resourceForm.controls['end_date'].setValue("");
    this.resourceForm.controls['hours'].setValue(0);
    this.resourceForm.controls['amount'].setValue(0);
  }

   getHitos() {
    let input = {
      "cod_servicio" : 11
    }
    this.service.getHitos(input).subscribe(data => {
      console.log("GET HITOS", data);
      this.dataSource = new MatTableDataSource<any>(data);
      this.hitos = data;
      this.suma_total = this.sumMontos(data);
      this.dataSource.paginator = this.paginator;
      console.log("SUMA TOTAL DE LOS HITOS = ", this.suma_total);
    });
  }
  sumMontos(data : any) {
    let suma = 0;
    for(let i = 0; i < data.length; i++)
      suma += parseInt(data[i].monto);
    return suma;
  }
  updateHito(element : any) {
    this.resourceForm.controls['nameHito'].setValue(element.descripcion_hito);
    this.resourceForm.controls['start_date'].setValue(element.fecha_inicio);
    this.resourceForm.controls['end_date'].setValue(element.fecha_fin);
    this.resourceForm.controls['hours'].setValue(element.horas);
    this.resourceForm.controls['amount'].setValue(element.monto);
    this.isUpdate = true;
    this.cod_hito = element.cod_hito;
    this.numero_hito = element.numero_hito;
    console.log("editando", element);

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
}
