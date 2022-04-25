// Service
export interface ICreateServiceRequest {
  cod_cliente:           number | null;
  cod_linea_servicio:    string;
  tipo_servicio:         string;
  descripcion_servicio:  string;
  horas_venta:           number | null;
  moneda:                string;
  tasa_cambio:           number | null;
  costo_venta:           number | null;
  costo_venta_sol:     number | null;
  valor_venta:           number | null;
  valor_venta_sol:     number | null;
  tarifa:                number | null;
  fecha_ini_planificada: Date | string;
  fecha_fin_planificada: Date | string;
  fecha_ini_real:        null | Date | string;
  fecha_fin_real:        null | Date | string;
  forma_pago:            string;
}

export interface ICreateServiceResponse {
  cod_servicio:            number;
  cod_linea_servicio:      string;
  tipo_servicio:           string;
  descripcion_servicio:    string;
  fecha_inicio_prop:       null | Date | string;
  fecha_fin_prop:          null | Date | string;
  horas_venta:             number;
  valor_venta:             null | number;
  costo_propuesta:         null | number;
  prod_venta:              null | number;
  fecha_ini_planificada:   Date;
  fecha_fin_planificada:   Date;
  fecha_ini_real:          null | Date | string;
  fecha_fin_real:          null | Date | string;
  horas_planificadas:      null | number;
  valor_venta_planificada: null | number;
  costo_planificada:       null | number;
  fecha_reg:               Date;
  usuario_reg:             string;
  fecha_act:               null | Date | string;
  usuario_act:             null | string;
  estado:                  string;
  cod_cliente:             number;
  forma_pago:              string;
  moneda:                  string;
  costo_venta:             string;
  tarifa:                  string;
  tasa_cambio:             string;
  valor_venta_sol:         string;
  costo_venta_sol:         string;
  newPayment:              NewPayment | null;
}

// Service Payment
export interface NewPayment {
  cod_hito:         number;
  cod_servicio:     number;
  descripcion_hito: string;
  horas:            number;
  monto:            string;
  fecha_inicio:     Date | null;
  fecha_fin:        Date | null;
  numero_hito:      string;
}

// Service Line
export interface IServiceLineResponse {
  cod_linea_servicio: string;
  linea_servicio:     string;
}

// Service type
export interface IServiceTypeResponse {
  cod_tipo_servicio:    string;
  nombre_tipo_servicio: string;
}

// Payment Method
export interface IPaymentMethodResponse {
  forma_pago: string;
}

// Exchange Rate
export interface IExchangeRateResponse {
  periodo:     string;
  tasa_cambio: string;
}