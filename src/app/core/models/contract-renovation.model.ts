export interface IGetRenovationData {
  nro_documento: number,
  nombres: string,
  nombre_corto: string,
  cod_linea_negocio: string,
  empresa: string,
  modalidad: string,
  remuneracion: string,
  bono_men: string,
  fecha_fin_ant: string,
  fecha_inicio_nuevo: string,
  puesto: string,
  nivel: string,
  linea_negocio: string,
  modalidad_bono: string
}

export interface ICreateRenovationRequest {
  cod_mapa_recurso: number,
  opcion_renovacion: string,
  fecha_fin_nuevo: string | null
}

export interface ICreateRenovationResponse {
  cod_solicitud_renovacion: number,
  tipo_solicitud: string,
  cod_colaborador: number,
  cod_cliente: number,
  cod_linea_negocio: string,
  opcion_renovacion: string,
  nueva_modalidad: boolean,
  nuevo_sueldo: boolean,
  nuevo_bono: boolean,
  nuevo_puesto: boolean,
  nuevo_nivel_puesto: boolean,
  cod_puesto: number,
  nivel: string,
  modalidad: string,
  remuneracion: string,
  modalidad_bono: string,
  bono_men: string,
  estado: string,
  fecha_reg: string,
  fecha_aprob: string,
  fecha_aprob_gg: string,
  fecha_rechaz: string,
  empresa: string,
  fecha_fin_ant: string,
  fecha_inicio_nuevo: string,
  fecha_fin_nuevo: string,
  motivo_rechazo: string
}
