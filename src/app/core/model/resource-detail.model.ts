import { Collaborator } from './collaborator.model'
import { Contract } from './contract.model'

export interface Detail{
  id: number,
  horasServicio: number,
  licencias: number,
  faltas: number,
  vacaciones: number,
  horasExtra: number,
  totalHorasAsignaciones: number,
  totalHorasFacturables: number,
  eficiencia: string,
  rendimiento: string,
  capacity: number,
  clm: string,
  fechaFinContrato: Date,
  colaborador: Collaborator,
  contratos: Contract[]
}
