import { Component, OnInit } from '@angular/core';
import { ServiceDataComponent } from 'src/app/components/service-data/service-data.component';
import { BillingServicesComponent } from 'src/app/components/billing-services/billing-services.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-services-configuration',
  templateUrl: './services-configuration.component.html',
  styleUrls: ['./services-configuration.component.scss']
})
export class ServicesConfigurationComponent implements OnInit {
  subject = new Subject<number>();
  sentService: string | null = '';
  constructor() { }

  ngOnInit(): void {
    try {
      let service = localStorage.getItem("service");
      service = JSON.parse(service!);
      console.log("service", service);
      this.sentService = service;
    } catch (e) {
      console.log("Servicio no encontrado!");
    }
  }

}
