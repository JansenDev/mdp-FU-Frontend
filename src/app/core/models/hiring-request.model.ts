export interface IHiringRequest {
  cod_solicitud_contratacion?: number;
  tipo_documento: string;
  nro_documento: string;
  nombre: string;
  ape_paterno: string;
  ape_materno: string;
  fecha_nacimiento: string; //o string
  nro_celular: number;
  correo: string;
  direccion: string;
  distrito: string;
  provincia: string;
  cod_cliente: number;
  cod_linea_negocio: number;
  cod_puesto: number;
  nivel: string;
  modalidad: string;
  remuneracion: number;
  fecha_inicio: string;
  fecha_fin: string;
  // opcionals
  cod_eps?: number;
  eps_parcial_total?: string;
  ind_sctr?: string;
  bono_men?: number | null;
  condicional_adicional?: string;
  puesto?: string;
  plan_eps?: string;
  nombre_corto?: string;
  estado?:string
}
