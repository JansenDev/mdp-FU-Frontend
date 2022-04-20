import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BillingServicesService } from 'src/app/core/services/billing-services.service';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

const ELEMENT_DATA : any[] = [
  {idHito: 1, nameHito: 'Análisis y Diseño', hours: 320, start_date: '14/07/2022', end_date: '14/12/2022', actions: '1'},
  {idHito: 2, nameHito: 'Análisis y Diseño', hours: 320, start_date: '14/07/2022', end_date: '14/12/2022', actions: '1'},
  {idHito: 3, nameHito: 'Análisis y Diseño', hours: 320, start_date: '14/07/2022', end_date: '14/12/2022', actions: '1'},
  {idHito: 4, nameHito: 'Análisis y Diseño', hours: 320, start_date: '14/07/2022', end_date: '14/12/2022', actions: '1'},
  {idHito: 5, nameHito: 'Análisis y Diseño', hours: 320, start_date: '14/07/2022', end_date: '14/12/2022', actions: '1'},
  {idHito: 6, nameHito: 'Análisis y Diseño', hours: 320, start_date: '14/07/2022', end_date: '14/12/2022', actions: '1'},
  {idHito: 7, nameHito: 'Análisis y Diseño', hours: 320, start_date: '14/07/2022', end_date: '14/12/2022', actions: '1'},
  {idHito: 8, nameHito: 'Análisis y Diseño', hours: 320, start_date: '14/07/2022', end_date: '14/12/2022', actions: '1'},
  {idHito: 9, nameHito: 'Análisis y Diseño', hours: 320, start_date: '14/07/2022', end_date: '14/12/2022', actions: '1'},
  {idHito: 10, nameHito: 'Análisis y Diseño', hours: 320, start_date: '14/07/2022', end_date: '14/12/2022', actions: '1'},
];

// const ELEMENT_PRUEBA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

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
  

    // displayedColumnsPrueba: string[] = ['position', 'name', 'weight', 'symbol'];
    // dataPrueba = ELEMENT_PRUEBA;

  displayedColumns: string[] = [
    'idHito',
    'nameHito',
    'hours',
    'start_date',
    'end_date',
    'actions'
  ];

  dataSource = ELEMENT_DATA;

  resourceForm: FormGroup;
  constructor(private service : BillingServicesService,
    private formBuilder : FormBuilder) {
      this.resourceForm = this.formBuilder.group({
        nameHito: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        hours: ['', Validators.required],
        amount: ['', Validators.required],
      });
     }

  ngOnInit(): void {
    let hitos = this.service.getHitos(); // obtención de los hitos de la tabla
    // this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    // console.log("data prueba", this.dataPrueba);

  }

  ngSubmit():void {
    //this.registerHito();
    console.log("enviando datos a Carlos...")
  }

  async registerHito() {
    let input = {
      "nameHito": this.nameHito,
      "startDate": this.startDate,
      "endDate": this.endDate,
      "hours": this.hours,
      "amount": this.amount
    }
    await this.service.registerHito(input).subscribe(data => {
      console.log("data", data);
    });
  }

}
