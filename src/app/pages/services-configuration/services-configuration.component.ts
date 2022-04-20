import { Component, OnInit } from '@angular/core';
import { ServiceDataComponent } from 'src/app/components/service-data/service-data.component';
import { BillingServicesComponent } from 'src/app/components/billing-services/billing-services.component';

@Component({
  selector: 'app-services-configuration',
  templateUrl: './services-configuration.component.html',
  styleUrls: ['./services-configuration.component.scss']
})
export class ServicesConfigurationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
