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

  nombre_perfil: 3;
  nombre_colaborador: number;
}

export interface IResourceRequest {
  periodo: string;
  cod_cliente: string | number; //TEst borrar string
  cod_perfil?: string | number;
  cod_colaborador?: number;
}

export interface IProductivityIndicator {
  low: number;
  medium: number;
  high: number;
}
