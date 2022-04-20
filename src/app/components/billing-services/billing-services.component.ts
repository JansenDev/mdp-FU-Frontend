import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-billing-services',
  templateUrl: './billing-services.component.html',
  styleUrls: ['./billing-services.component.scss']
})
export class BillingServicesComponent implements OnInit {
  
  displayedColumns: string[] = [
    'idHito',
    'nameHito',
    'hours',
    'amount',
    'start_date',
    'end_date',
    'actions'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
