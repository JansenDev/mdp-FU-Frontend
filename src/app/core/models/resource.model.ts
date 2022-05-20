export interface IResourceResponse {
  linea_negocio: 'SWF';
  estado: 'A';
  nivel: 'junior';
  fecha_fin: string | Date;
  fecha_inicio: string | Date;
  asignacion: string;
  clm_efectivo: string | number;
  produccion: string | number;
  productividad: string | number;
  cod_colaborador: string;
  nombre_perfil: 3;
  nombre_colaborador: string;
  cod_mapa_recurso: string;
}

export interface IResourceRequest {
  periodo: string;
  cod_cliente: string | number; //TEst borrar string
  cod_perfil?: string | number;
  cod_colaborador?: number;
  nombres?: string;
  contrato_vencer?: string | number;
}

export interface IProductivityIndicator {
  low: number;
  medium: number;
  high: number;
}

export interface IResourceMapFilters {
  cboxPeriod: string;
  cboxClient: string;
  cboxProfile: string;
  cboxCxV: string;
  inNames: string;
  // TEMPORAL SESION
  inputIdUser?:any
}
