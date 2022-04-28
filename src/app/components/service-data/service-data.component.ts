import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ICreateServiceRequest, IExchangeRateResponse, IPaymentMethodResponse, IServiceLineResponse, IServiceTypeResponse, ICreateServiceResponse } from 'src/app/core/models/service.model';
import { NgForm } from '@angular/forms';
import { ServicesService } from 'src/app/core/services/services.service';
import { IClientResponse } from 'src/app/core/models/client.model';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-data',
  templateUrl: './service-data.component.html',
  styleUrls: ['./service-data.component.scss'],
  providers: [DatePipe]
})
export class ServiceDataComponent implements OnInit {

  @ViewChild('serviceForm', {static:false}) public ServiceForm!: NgForm;

  clients: IClientResponse[] = [];
  serviceLines: IServiceLineResponse[] = [];
  serviceTypes: IServiceTypeResponse[] = [];
  paymentMethods: IPaymentMethodResponse[] = [];
  serviceResponse: any = null;
  selectedClient = '';
  selectedServiceLine = '';
  selectedServiceType = '';
  selectedPaymentMethod = '';
  formData: ICreateServiceRequest = {
    cod_cliente: null,
    cod_linea_servicio: "",
    tipo_servicio: "",
    descripcion_servicio: "",
    horas_venta: null,
    moneda: "SOL",
    tasa_cambio: null,
    costo_venta: null,
    costo_venta_sol: null,
    valor_venta: null,
    valor_venta_sol: null,
    prod_venta: null,
    tarifa: null,
    fecha_ini_planificada: "",
    fecha_fin_planificada: "",
    fecha_ini_real: null,
    fecha_fin_real: null,
    forma_pago: ""
  }
  currencies = [
    { value: 'sol-0', viewValue: 'SOL' },
    { value: 'dolar-1', viewValue: 'DOLAR' }
  ]
  exchangeRate!: IExchangeRateResponse;
  disableAll: boolean = false;
  @Input() subject!: Subject<any>;
  disableBilling = true;
  cod_servicio: number = 0;
  @Input() update: boolean = false;

  constructor(
    private servicesService: ServicesService,
    private activatedRoute: ActivatedRoute) {}

  sendInfo = (): void => {
    this.subject.next(
      {
        cod_servicio: this.cod_servicio,
        disableBilling: this.disableBilling
      }
    );
  };

  ngOnInit(): void {
    this.loadClients();
    this.loadServiceLines()
    this.loadExchangeRate();
    const pathParams = this.activatedRoute.snapshot.paramMap;
    let receivedServiceId = pathParams.get('cod_servicio')!;
    const serviceId = parseInt(receivedServiceId);
    console.warn('serviceID: ', serviceId);
    if (receivedServiceId){
      this.loadService(serviceId);
    }
  }

  loadClients(){
    this.servicesService.getClientsByCodUser().
    subscribe(clientData => {
      console.log('clients: ', clientData);
      this.clients = clientData;
    }, error => {
      console.error(error);
    });
  }

  loadServiceLines(){
    this.servicesService.getServiceLines().
    subscribe(linesData => {
      console.log('service lines: ', linesData);
      this.serviceLines = linesData;
    }, error => {
      console.error(error);
    });
  }

  loadServiceTypes(serviceLineCode: string){

    const pathParams = this.activatedRoute.snapshot.paramMap;
    let receivedServiceId = pathParams.get('cod_servicio')!;
    const serviceId = parseInt(receivedServiceId);

    if (!serviceId) {
      this.selectedPaymentMethod = '';
      this.selectedServiceType = '';
      this.formData.forma_pago = '';
      this.formData.tipo_servicio = '';
    }

    this.servicesService.getServiceTypeByCodServiceLine(serviceLineCode).
    subscribe(serviceTypes => {
      console.log('service types: ', serviceTypes);
      this.serviceTypes = serviceTypes;
    }, error => {
      console.error(error);
    });
    console.log('selected sl: ', this.selectedServiceLine);
  }

  loadPaymentMethods(serviceType: string){
    this.servicesService.getPaymentMethodsByServiceType(serviceType).
    subscribe(paymentMethods => {
      console.log('payment methods: ', paymentMethods);
      this.paymentMethods = paymentMethods;
      if (this.paymentMethods.length === 1){
        this.selectedPaymentMethod = paymentMethods[0].forma_pago;
        this.formData.forma_pago = paymentMethods[0].forma_pago;
      }
      if (this.selectedServiceType === "RQ"){
        this.selectedPaymentMethod ="total";
        this.formData.forma_pago = "total";
      }

    }, error => {
      console.error(error);
    });
  }

  createService(service: ICreateServiceRequest){
    this.servicesService.createService(service).
      subscribe(createdService => {
        console.log('created service: ', createdService);
        this.serviceResponse = createdService;
        this.cod_servicio = this.serviceResponse.cod_servicio;
        if (this.formData.forma_pago == 'consumo' || this.formData.forma_pago == 'total'){
          this.disableBilling = true;
        } else {
          this.disableBilling = false;
        }
        this.sendInfo();
        console.log('response: ', this.serviceResponse);
        this.disableAll = true;
      },  error => {
        console.error(error);
      })
  }

  submitForm(){
    console.log(this.ServiceForm);
    this.createService(this.formData);
  }

  loadExchangeRate() {
    this.servicesService.getExchangeRate()
    .subscribe(exchangeRateData => {
      console.log('echange rate: ', exchangeRateData);
      this.exchangeRate = exchangeRateData;
      this.formData.tasa_cambio = parseFloat(this.exchangeRate.tasa_cambio)
    }, error => {
      console.error(error);
    });
  }

  calculateSoles(data: string): number {
    if (data === 'valor'){
      return this.formData.tasa_cambio! * this.formData.valor_venta!;
    }

    return this.formData.tasa_cambio! * this.formData.costo_venta!;
  }

  calculateRate(){
    setTimeout(() => {
      if (this.formData.moneda == 'DOLAR'){
        this.formData.tarifa = (this.formData.valor_venta! * this.formData.tasa_cambio!) / this.formData.horas_venta!;
      } else {
          this.formData.tarifa = this.formData.valor_venta! / this.formData.horas_venta!;
      }
    }, 0);

    if (this.formData.tarifa){
      return this.formData.tarifa!;
    }
    return
  }

  loadService(serviceId: number){
    this.servicesService.findOneServiceMap(serviceId)
      .subscribe(
        {
          next: (foundService) => {
            this.subject.next(foundService);
            console.log('servicio encontrado: ', foundService);
            this.formData = foundService;
            this.selectedServiceLine = foundService.cod_linea_servicio;
            this.loadServiceTypes(this.selectedServiceLine);
            this.selectedServiceType = foundService.tipo_servicio;
            this.loadPaymentMethods(this.selectedServiceType);
            this.selectedPaymentMethod = foundService.forma_pago;
          },
          error: (e) => console.error(e)
        }
      );
  }
}
