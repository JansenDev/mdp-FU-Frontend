export interface Contract {
  cod_colaborador: number;
  nro_documento: string;
  nombres: string;
  apellido_pat: string;
  apellido_mat: string;
  sueldo_planilla: string;
  bono: string;
  eps: string;
  clm: string;
  cod_contrato: number;
  modalidad: string;
  fecha_fin: Date | null;
}
