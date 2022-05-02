export interface ICollaboratorResponse {
  apellido_mat: string;
  apellido_pat: string;
  cod_colaborador: number;
  nombres: string;
}

export interface ICollaboratorAssigned extends ICollaboratorResponse {
  nro_documento: string;
  cod_puesto: number;
  puesto: string;
  nivel: string;
  fecha_fin: string | Date;
  modalidad: string;
  import: string;
  bono: string;
  clm: string;
  asignacionAcumulada?: number;
}
