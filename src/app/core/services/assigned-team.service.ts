import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IAssignedCollaboratorBody,
  IAssignedCollaboratorTable,
  IAssignmentAccumlate,
  IHourAssignedResponse,
} from '../models/assignment.model';
import { IStatusRequestSimple } from '../models/status-request-simple.model';

const { url_base } = environment;

@Injectable({
  providedIn: 'root',
})
export class AssignedTeamService {
  constructor(private httpClient: HttpClient) {}

  // Typed
  collaboratorMaxAccumPercent(
    dateStart: string | Date,
    dateEnd: string | Date,
    idCollaborator: number
  ) {
    const URL = `${url_base}/assignments/maxAccumPercent/${dateStart}/${dateEnd}/${idCollaborator}`;

    return this.httpClient.get<IAssignmentAccumlate>(URL);
  }

  getHourAssigned(dateStart: string | Date, dateEnd: string | Date) {
    const URL = `${url_base}/assignedHours/${dateStart}/${dateEnd}`;

    return this.httpClient.get<IHourAssignedResponse>(URL);
  }

  saveCollaboratorToService(
    cod_colaborador: number,
    cod_puesto: number,
    cod_servicio: number,
    fecha_ini: string | Date,
    fecha_fin: string | Date,
    horas_asignadas: number,
    nivel: string,
    percent: string,
    tarifa: string,
    cod_asignacion?: number
  ) {
    const asignmentBody: IAssignedCollaboratorBody = {
      cod_colaborador,
      cod_puesto,
      cod_servicio,
      fecha_ini,
      fecha_fin,
      horas_asignadas,
      nivel,
      percent,
      tarifa,
      cod_asignacion,
    };

    const URL = `${url_base}/assignments/createOrEditAssignment`;

    return this.httpClient.post<IStatusRequestSimple>(URL, asignmentBody);
  }

  findAssignedTeamByCodService(codService: string | number) {
    const URL = `${url_base}/assignments/showgrid/${codService}`;

    return this.httpClient.get<IAssignedCollaboratorTable[]>(URL);
  }

  deleteAsigned(codAssignment: number) {
    const URL = `${url_base}/assignments/deleteAssignment/${codAssignment}`;
    return this.httpClient.delete<IStatusRequestSimple>(URL);
  }
}
