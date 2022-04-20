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
  dataSource: MatTableDataSource<any> =
    new MatTableDataSource<any>([]);

  displayedColumns: string[] = [
    'idHito',
    'nameHito',
    'hours',
    'amount',
    'start_date',
    'end_date',
    'actions'
  ];
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
  }

  ngSubmit():void {
    this.registerHito();
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
