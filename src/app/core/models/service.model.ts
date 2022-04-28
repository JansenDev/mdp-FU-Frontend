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
  costo_venta_sol:       number | null;
  valor_venta:           number | null;
  valor_venta_sol:       number | null;
  prod_venta:            number | null;
  tarifa:                number | null;
  fecha_ini_planificada: Date | string;
  fecha_fin_planificada: Date | string;
  fecha_ini_real:        null | Date | string;
  fecha_fin_real:        null | Date | string;
  forma_pago:            string;
  etapa:                 string | null;
  estado:                string | null;
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
  estado_servicio:         string;
  cod_cliente:             number;
  forma_pago:              string;
  moneda:                  string;
  costo_venta:             string;
  tarifa:                  string;
  tasa_cambio:             string;
  valor_venta_sol:         string;
  costo_venta_sol:         string;
  etapa:                   string | null;
  estado:                  string | null;
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

// Service
export interface IGetServiceResponse {
  cod_servicio:                number;
  nombre_corto:                string;
  tipo_servicio:               string;
  etapa:                       null;
  estado:                      string | null;
  horas_venta:                 number;
  valor_venta:                 string;
  fecha_ini_planificada:       Date;
  fecha_fin_planificada:       Date;
  fecha_ini_real:              null;
  fecha_fin_real:              null;
  horas_planificadas:          null;
  valor_venta_planificada:     null;
  horas_ejecutadas:            null;
  horas_produccion_ejecutadas: null;
}

export interface IPostServiceRequest {
  cod_cliente:       number | string;
  cod_linea_negocio: string;
  estado:            string;
}

// Get One Service Map
export interface IGetOneServiceMapResponse {
  cod_servicio?:          number;
  cod_cliente:           number;
  cod_linea_servicio:    string;
  tipo_servicio:         string;
  descripcion_servicio:  string;
  horas_venta:           number;
  moneda:                string;
  tasa_cambio:           any;
  costo_venta:           any;
  costo_venta_sol:       any;
  valor_venta:           any;
  valor_venta_sol:       any;
  tarifa:                any;
  fecha_ini_planificada: Date;
  fecha_fin_planificada: Date;
  fecha_ini_real:        null;
  fecha_fin_real:        null;
  prod_venta:            null;
  forma_pago:            string;
  usuario_reg?:           string;
  estado_servicio?:       string;
  etapa:                 string | null;
  estado:                string | null;
  pagos_servicios?:       NewPayment[];
  asignaciones?:          AssignmentService[];
}

export interface AssignmentService {
  cod_asignacion:   number;
  puesto:           number;
  nivel:            string;
  por_asignacion:   number;
  fecha_inicio:     Date;
  fecha_fin:        Date;
  horas_asignacion: number;
  nombres:          string;
  apellido_pat:     string;
  apellido_mat:     string;
}
