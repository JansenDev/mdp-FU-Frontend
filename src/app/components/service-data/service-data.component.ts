import { Component, OnInit, ViewChild } from '@angular/core';
import { ICreateServiceRequest, IExchangeRateResponse, IPaymentMethodResponse, IServiceLineResponse, IServiceTypeResponse } from 'src/app/core/models/service.model';
import { NgForm } from '@angular/forms';
import { ServicesService } from 'src/app/core/services/services.service';
import { IClientResponse } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-service-data',
  templateUrl: './service-data.component.html',
  styleUrls: ['./service-data.component.scss']
})
export class ServiceDataComponent implements OnInit {

  @ViewChild('serviceForm', {static:false}) public ServiceForm!: NgForm;

  clients: IClientResponse[] = [];
  serviceLines: IServiceLineResponse[] = [];
  serviceTypes: IServiceTypeResponse[] = [];
  paymentMethods: IPaymentMethodResponse[] = [];
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
    costo_venta_dolar: null,
    valor_venta: null,
    valor_venta_dolar: null,
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

  constructor(
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {
    this.loadClients();
    this.loadServiceLines()
    console.log("selected client:", this.selectedClient);
    this.loadExchangeRate();
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
    this.selectedPaymentMethod = '';
    this.selectedServiceType = '';
    this.formData.forma_pago = '';
    this.formData.tipo_servicio = '';
    this.servicesService.getServiceTypeByCodServiceLine(serviceLineCode).
    subscribe(serviceTypes => {
      console.log('service types: ', serviceTypes);
      this.serviceTypes = serviceTypes;
    }, error => {
      console.error(error);
    });
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
      this.formData.tarifa = this.formData.valor_venta! / this.formData.horas_venta!;
    }, 0);
    return this.formData.tarifa;
  }


}
