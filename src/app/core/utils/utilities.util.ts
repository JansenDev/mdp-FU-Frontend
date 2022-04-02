import { ICollaboratorResponse } from '../models/collaborator.model';
import { IPeriodResponse } from '../models/period.model';

export function getIdCollaboratorFromNameLong(
  collaboratorNameLong: string,
  collaboratorList: ICollaboratorResponse[]
): number | null {
  let collaboradorId = null;

  for (let index = 0; index < collaboratorList.length; index++) {
    const collaborator = collaboratorList[index];

    if (
      collaboratorNameLong.includes(collaborator.nombres) &&
      collaboratorNameLong.includes(collaborator.apellido_pat) &&
      collaboratorNameLong.includes(collaborator.apellido_mat)
    ) {
      collaboradorId = collaborator.cod_colaborador;
      break;
    }
  }

  return collaboradorId;
}

export function findPeriodActive(periodlist: IPeriodResponse[]): string {
  let codState = '';

  for (let index = 0; index < periodlist.length; index++) {
    const period = periodlist[index];

    if (period.estado == 'A') {
      codState = period.periodo;
      break;
    }
  }

  return codState;
}
