import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private service : BillingServicesService) { }

  ngOnInit(): void {
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
