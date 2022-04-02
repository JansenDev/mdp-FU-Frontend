import { IProductivityIndicator } from '../models/resource.model';

export const PRODUCTIVITY_INDICATOR: IProductivityIndicator = {
  low: 1.2,
  medium: 1.5,
  high: 1.8,
};

export const STATE: { [x: string]: string } = {
  A: 'activo',
  I: 'no activo',
  C: 'cesado',
};

export const USER_SESION = 8;
