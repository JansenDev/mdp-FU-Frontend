import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BillingServicesService } from 'src/app/core/services/billing-services.service';

@Component({
  selector: 'app-billing-services',
  templateUrl: './billing-services.component.html',
  styleUrls: ['./billing-services.component.scss']
})


export class BillingServicesComponent implements OnInit {
  
  private nameHito = '';
  private startDate = '';
  private endDate = '';
  private hours = '';
  private amount = '';

  
  @ViewChild(MatPaginator)
  paginator: MatPaginator = {} as MatPaginator;
  
  displayedColumns: string[] = [
    'cod_servicio',
    //'cod_hito',
    'descripcion_hito',
    'horas',
    'monto',
    'fecha_inicio',
    'fecha_fin',
    'actions'
  ];

  dataSource = [];

  resourceForm: FormGroup;
  constructor(private service : BillingServicesService,
    private formBuilder : FormBuilder) {
      this.resourceForm = this.formBuilder.group({
        cod_servicio: 1, // luego cambiar
        nameHito: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        hours: ['', Validators.required],
        amount: ['', Validators.required],
      });
     }

  ngOnInit(): void {
    let hitos = this.getHitos(); // obtención de los hitos de la tabla
    
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
  }

  async registerHito() {
    let input = {
      "cod_servicio": this.resourceForm.value.cod_servicio,
      "descripcion_hito": this.resourceForm.value.nameHito,
      "fecha_inicio": this.resourceForm.value.start_date,
      "fecha_fin": this.resourceForm.value.end_date,
      "horas": this.resourceForm.value.hours,
      "monto": this.resourceForm.value.amount
    };
    console.log("input register", input);
    await this.service.registerHito(input).subscribe(data => {
      console.log("data registerHito", data);
    });
  }

  async getHitos() {
    let input = {
      "cod_servicio" : 1
    }
    await this.service.getHitos(input).subscribe(data => {
      console.log("GET HITOS", data);
      this.dataSource = data;
    });
  }
}
