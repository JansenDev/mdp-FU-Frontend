export interface IContractImbox {
  cod_solicitud_contratacion: number;
  cod_linea_negocio: string;
  estado: string;
  fecha_reg: string;
  modalidad: string;
  nivel: string;
  nombre_apellidos: string;
  nombre_corto: string;
  nro_documento: string;
  puesto: string;
  remuneracion: string;
  fecha_aprob?: string | Date;
  fecha_aprob_gg?: string | Date;
  ind_aprobacion_gg?: string;
  bono_men?: string;
  cod_eps?: number;
  ind_sctr?: string;
  tipo_solicitud?: string;
}
