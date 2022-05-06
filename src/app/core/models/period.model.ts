export interface IGetLastPeriodRequest{
  periodo: string,
  tasa_cambio: number | null
}

export interface IPeriodResponse extends IGetLastPeriodRequest {
  fecha_apertura: Date,
  estado: string;
}

export interface ICreatePeriodRequest {
  periodo: string,
  tasa_cambio: number | null
}

export interface IUpdatePeriodRequest {
  tasa_cambio: number | null
}
