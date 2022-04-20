// Service
export interface ICreateServiceRequest {
  cod_cliente:           number;
  cod_linea_servicio:    string;
  tipo_servicio:         string;
  descripcion_servicio:  string;
  horas_venta:           number;
  moneda:                string;
  valor_venta:           number;
  fecha_ini_planificada: Date | string;
  fecha_fin_planificada: Date | string;
  fecha_ini_real:        null | Date | string;
  fecha_fin_real:        null | Date | string;
  forma_pago:            string;
  estado:                string;
}

export interface ICreateServiceResponse {
  cod_servicio:            number;
  cod_linea_servicio:      string;
  tipo_servicio:           string;
  descripcion_servicio:    string;
  fecha_inicio_prop:       null;
  fecha_fin_prop:          null;
  horas_venta:             number;
  valor_venta:             string;
  costo_propuesta:         null;
  prod_venta:              null;
  fecha_ini_planificada:   Date;
  fecha_fin_planificada:   Date;
  fecha_ini_real:          null;
  fecha_fin_real:          null;
  horas_planificadas:      null;
  valor_venta_planificada: null;
  costo_planificada:       null;
  fecha_reg:               Date;
  usuario_reg:             string;
  fecha_act:               null;
  usuario_act:             null;
  estado:                  string;
  cod_cliente:             number;
  forma_pago:              string;
  moneda:                  string;
  newPayment:              NewPayment | null;
}

// Service Payment
export interface NewPayment {
  cod_hito:         number;
  cod_servicio:     number;
  descripcion_hito: string;
  horas:            number;
  monto:            string;
  fecha_inicio:     Date;
  fecha_fin:        Date;
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
