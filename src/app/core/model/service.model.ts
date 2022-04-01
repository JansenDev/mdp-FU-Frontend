import { ResourceAssignment } from "./resource-assignment.model";

export interface Service {
  tipoServicio: string,
  descripcionServicio: string,
  AsignacionRecurso: ResourceAssignment
}
