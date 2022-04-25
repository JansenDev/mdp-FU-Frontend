import { Component, OnInit } from '@angular/core';
import { IGetServiceResponse, IPostServiceRequest } from 'src/app/core/models/service.model';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-service-map',
  templateUrl: './service-map.component.html',
  styleUrls: ['./service-map.component.scss']
})
export class ServiceMapComponent implements OnInit {

  services: IGetServiceResponse[] = [];

  constructor(
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {}

  findServices(filters: IPostServiceRequest): void {
    this.servicesService.findServices(filters).subscribe(res => {
      this.services = res;
      console.log(this.services);
    }, err => {
      console.log(err);
    });
  }

}
