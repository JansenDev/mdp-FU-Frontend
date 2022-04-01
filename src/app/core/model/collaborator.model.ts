import { Service } from "./service.model";

export interface Collaborator {
  codColaborador: number,
  nombres: string,
  apellidoPat: string,
  apellidoMat: string,
  servicios: Service[]
}
