export interface Assignment {
  tipo_servicio: string;
  descripcion_servicio: string;
  por_asignacion: number;
  fecha_inicio: Date;
  fecha_fin: Date;
}

export interface IAssignedCollaboratorBody {
  cod_colaborador: number;
  cod_puesto: number;
  cod_servicio: number;
  fecha_fin: string | Date;
  fecha_ini: string | Date;
  horas_asignadas: number;
  nivel: string;
  percent: string;
  tarifa: string;
  cod_asignacion?: number;
}

export interface IHourAssignedResponse {
  horas_asignadas_asignacion_total: number;
}

export interface IAssignmentAccumlate {
  maximo_porcentaje_acumulado: number;
}

export interface IAssignedCollaboratorTable {
  puesto: string;
  nivel: string;
  nro_documento?: string;
  nombres_apellidos: string;
  fecha_inicio: string | Date;
  fecha_fin: string | Date;
  por_asignacion: number;
  horas_asignacion?: string;
  cod_asignacion?: number;
  cod_colaborador?: number;
  cod_servicio?: number;
  prod_planificada?: string;
  cod_puesto?: number;
  tarifa?: string;
}
