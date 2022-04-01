import { IProductivityIndicator } from '../models/resource.model';

export const productivityIndicator: IProductivityIndicator = {
  low: 1.2,
  medium: 1.5,
  high: 1.8,
};

export const states: { [x: string]: string } = {
  A: 'Activo',
  I: 'Inactive',
  C: 'Cesado',
};
