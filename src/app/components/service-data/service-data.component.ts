import { Component, OnInit } from '@angular/core';
import { ICreateServiceRequest } from 'src/app/core/models/service.model';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-service-data',
  templateUrl: './service-data.component.html',
  styleUrls: ['./service-data.component.scss']
})
export class ServiceDataComponent implements OnInit {

  currencies = [
    { value: 'sol-0', viewValue: 'SOL' },
    { value: 'dolar-1', viewValue: 'DOLAR' }
  ]

  constructor(
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {
  }

}
