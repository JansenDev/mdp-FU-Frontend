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
  cod_linea_negocio: string;
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
  estado?: string;
  ind_asign_familiar?: string;
  // ajustes
  empresa?: string;
  sexo?: string;
  condicion_proyecto_area?: string;
  horario_laboral?: string;
  tarifa_mensual?: string;
  asignacion_equipo?: string;
  jefe_responsable_directo?: string;
  cv?: string;
  //
  motivo_rechazo?: string;
  productividad?: string;
}
