export interface IResourceResponse {
  asignacion: string;
  box: string;
  capacity: number;
  clm: string | number;
  clm_efectivo: string | number;
  cod_cliente: number;
  cod_colaborador: number;
  cod_mapa_recurso: number;
  costo_asignacion: string | number;
  eficiencia: string | number;
  estado: 'A';
  faltas: number;
  fecha_cese: string | Date;
  fecha_fin: string | Date;
  fecha_fin_contrato: string | Date;
  fecha_inicio: string | Date;
  fin_vacaciones: string | Date;
  horas_extras: number;
  horas_servicio: number;
  inicio_vacaciones: string | Date;
  licencias: number;
  linea_negocio: 'SWF';
  nivel: 'junior';
  perfil: 3;
  periodo: string;
  produccion: string | number;
  produccion_horas_extras: string | number;
  productividad: string | number;
  rendimiento: string | number;
  total_horas_asignaciones: number;
  total_horas_facturables: number;
  vacaciones: number;
}

export interface IResourceRequest {
  periodo: string;
  cliente: string;
  perfil?: string | number;
  names?: string;
}
