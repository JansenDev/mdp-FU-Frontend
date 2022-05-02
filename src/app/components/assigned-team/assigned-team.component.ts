import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import {
  IAssignedCollaboratorBody,
  IAssignedCollaboratorTable,
} from 'src/app/core/models/assignment.model';
import { ICollaboratorAssigned } from 'src/app/core/models/collaborator.model';
import { IProfileResponse } from 'src/app/core/models/profile.model';
import { IAssignmentServiceMain } from 'src/app/core/models/service.model';
import { AssignedTeamService } from 'src/app/core/services/assigned-team.service';
import { CboxService } from 'src/app/core/services/cbox.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ResourceService } from 'src/app/core/services/resource.service';
import * as util from '../../core/utils/utilities.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assigned-team',
  templateUrl: './assigned-team.component.html',
  styleUrls: ['./assigned-team.component.scss'],
})
export class AssignedTeamComponent implements OnInit {
  @Input() subject!: Subject<any>;
  formAssignedTeam: FormGroup;
  serviceResponse!: IAssignmentServiceMain;
  printErrors = {
    name: '',
    message: '',
    hint: '',
  };
  profileList: IProfileResponse[] = [];
  collaboratorCurrentForm!: ICollaboratorAssigned;
  productionPlannedCalc: number = 0;
  assignmentHour: number = 0;
  assignmentHourTotal: number = 0;
  productionPlanned: number = 0;
  avaibleAssignment: number = 0;
  assignedTeamList!: IAssignedCollaboratorTable[];

  constructor(
    private notification: NotificationService,
    private formBuilder: FormBuilder,
    private cboxService: CboxService,
    private resourceService: ResourceService,
    private assignedTeamService: AssignedTeamService,
    private activatedRoute: ActivatedRoute
  ) {
    this.formAssignedTeam = this.formBuilder.group({
      inputDocumentNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(/[0-9]{8,15}/),
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],

      inputName: [{ value: null, disabled: true }],
      cboxProfile: [{ value: null, disabled: false }],
      cboxLevel: [{ value: null, disabled: false }],
      inputAssignament: [
        { value: null, disabled: false },
        [Validators.required, Validators.pattern(/^[1-9][0-9]?0?$/)],
      ],
      inputTariff: [
        null,
        [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]+)?$/)],
      ],
      dpDateStart: [null, Validators.required],
      dpDateEnd: [null, Validators.required],
      inputHourAssignment: [{ value: 0, disabled: true }],
      // inputProductionEstimated: [{ value: ' ', disabled: true }],
    });
  }

  displayedColumns: string[] = [
    'profile',
    'level',
    'names',
    'assignment',
    'd_start',
    'd_end',
    'hour_assigned',
    'prod_planned',
    'action_edit',
    'action_delete',
  ];
  dataSource = [] as IAssignedCollaboratorTable[];

  ngOnInit(): void {
    //  service info  created
    this.subject.subscribe((serviceResponse) => {
      this.serviceResponse = serviceResponse;
      this.setTarifaByDefault();
    });

    this.onChangeDateStart$();
    this.onChangeDateEnd$();
    this.fillCboxProfile(); //
    this.onchangeInputDocumentNumber$();
    this.onChangeInputAsignment$();
    this.onChangeInputTariff$();
    this.fillAssignedTeamTable();
  }

  onChangeInputAsignment$() {
    this.formAssignedTeam.controls['inputAssignament'].valueChanges.subscribe({
      next: this.operationsNext.bind(this),
    });
  }

  protected operationsNext() {
    const dateEnd = this.formAssignedTeam.controls['dpDateEnd'].value;
    const dateStart = this.formAssignedTeam.controls['dpDateStart'].value;

    if (dateEnd && dateStart) {
      const dateStartString = util.timestampFormat(dateStart);
      const dateEndString = util.timestampFormat(dateEnd);

      // TODO:
      this.getAssignedHours(dateStartString!, dateEndString!);
    }
  }

  protected onChangeInputAsignmentNext() {
    // *Tarifa
    const inputTariff = this.formAssignedTeam.controls['inputTariff'].value;

    const inputAssignament =
      this.formAssignedTeam.controls['inputAssignament'].value;

    if (inputTariff && inputAssignament) {
      const tariffFloat = parseFloat(inputTariff);
      const assignamentValue = parseInt(inputAssignament);

      this.assignmentHourTotal = (assignamentValue * this.assignmentHour) / 100;
      this.productionPlanned = this.assignmentHourTotal * tariffFloat;
    } else {
      this.assignmentHourTotal = 0;
      this.productionPlanned = 0;
    }

    // if (inputAssignament) {
    //   const assignamentValue = parseInt(inputAssignament);
    //   const assignamentRemaining = this.avaibleAssignment - assignamentValue;

    //   // console.log('assignamentRemaining');
    //   // console.log(assignamentRemaining);

    //   const isValidInputAssignment =
    //     this.formAssignedTeam.controls['inputAssignament'].valid;

    //   if (isValidInputAssignment) {
    //     // validar asignacion disponible
    //     if (assignamentRemaining < 0) {
    //       this.formAssignedTeam.controls['inputAssignament'].setErrors({
    //         error: true,
    //       });
    //       return;
    //     } else {
    //       this.formAssignedTeam.controls['inputAssignament'].setErrors(null);
    //     }

    //     this.assignmentHourTotal =
    //       (assignamentValue * this.assignmentHour) / 100;
    //     this.onChangeInputTariffNext();
    //   } else {
    //     this.assignmentHourTotal = 0;
    //     this.productionPlanned = 0;
    //   }
    // }
  }

  onChangeInputTariff$() {
    this.formAssignedTeam.controls['inputTariff'].valueChanges.subscribe({
      next: this.operationsNext.bind(this),
    });
  }

  // protected onChangeInputTariffNext() {
  //   // const isValidInputTariff =
  //   //   this.formAssignedTeam.controls['inputTariff'].valid;
  //   const inputTariff = this.formAssignedTeam.controls['inputTariff'].value;

  //   if (inputTariff) {
  //     const tariffFloat = parseFloat(inputTariff);

  //     this.productionPlanned = this.assignmentHourTotal * tariffFloat;
  //   } else {
  //     this.productionPlanned = 0;
  //   }
  //   // if (isValidInputTariff) {
  //   //   const tariffFloat = parseFloat(inputTariff);

  //   //   this.productionPlanned = this.assignmentHourTotal * tariffFloat;
  //   // } else {
  //   //   this.productionPlanned = 0;
  //   // }
  // }

  ngSubmit() {
    this.saveAssignedCollaborator();
  }

  // crud
  protected saveAssignedCollaborator() {
    const {
      cod_servicio,
      cod_colaborador,
      percent,
      fecha_ini,
      fecha_fin,
      horas_asignadas,
      cod_puesto,
      nivel,
      tarifa,
      cod_asignacion,
    }: IAssignedCollaboratorBody = this.getFormAssignedTeam();

    this.assignedTeamService
      .saveCollaboratorToService(
        cod_colaborador,
        cod_puesto,
        cod_servicio,
        fecha_ini,
        fecha_fin,
        horas_asignadas,
        nivel,
        percent,
        tarifa,
        cod_asignacion
      )
      .subscribe((data) => {
        if (data.error) {
          console.warn(data.message);
          this.notification.toast('error', data.message, 'ERROR');
          return;
        }
        this.serviceResponse.cod_asignacion = undefined;
        this.fillAssignedTeamTable();
        this.onCancel();
      });
  }

  deleteAssignment(assignedCollaborattor: IAssignedCollaboratorTable) {
    console.log(assignedCollaborattor);

    const { cod_asignacion } = assignedCollaborattor;

    this.assignedTeamService
      .deleteAsigned(cod_asignacion!)
      .subscribe((response) => {
        console.log(response);
        if (!response.error) {
          this.fillAssignedTeamTable();
        }
      });
  }

  editAssignment(assignedCollaborator: IAssignedCollaboratorTable) {
    this.formAssignedTeam.reset();
    const { cod_asignacion } = assignedCollaborator;
    this.serviceResponse.cod_asignacion = cod_asignacion;

    console.log(cod_asignacion);
    this.setEditData(assignedCollaborator);
  }

  setEditData(assignedCollaborator: IAssignedCollaboratorTable) {
    this.formAssignedTeam.controls['inputDocumentNumber'].disable();
    // this.formAssignedTeam.reset();
    this.formAssignedTeam.patchValue({
      inputDocumentNumber: assignedCollaborator.nro_documento,
      cboxLevel: assignedCollaborator.nivel,
      cboxProfile: assignedCollaborator.cod_puesto,
      dpDateStart: assignedCollaborator.fecha_inicio,
      dpDateEnd: assignedCollaborator.fecha_fin,
      inputAssignament: assignedCollaborator.por_asignacion,
      inputTariff: assignedCollaborator.tarifa,
    });
  }

  // Use subject next
  fillAssignedTeamTable() {
    const route = this.activatedRoute.snapshot.paramMap;
    let cod_servicio = route.get('cod_servicio')!;

    if (!cod_servicio) {
      cod_servicio = this.serviceResponse?.cod_servicio;
    }

    this.assignedTeamService
      .findAssignedTeamByCodService(cod_servicio)
      .subscribe((assignedCollaborators) => {
        this.assignedTeamList = assignedCollaborators;
        this.dataSource = assignedCollaborators;
      });
  }

  onchangeInputDocumentNumber$() {
    this.formAssignedTeam.controls[
      'inputDocumentNumber'
    ].valueChanges.subscribe((inputDocumentNumber: string) => {
      this.cleanFields();

      if (inputDocumentNumber && inputDocumentNumber.length >= 8) {
        if (this.serviceResponse?.cod_cliente) {
          const { cod_cliente } = this.serviceResponse!;
          this.resourceService
            .findCollaboratorsByidClient(cod_cliente, inputDocumentNumber)
            .subscribe({
              next: this.onChangeInputDocumentNext.bind(this),
              error: (e) => console.log(e),
            });
        } else {
          this.formAssignedTeam.controls['inputDocumentNumber'].setErrors({
            error: true,
          });
          this.printErrors.message = 'No existe cliente en el servicio';
          this.notification.toast('error', 'error p prro');
        }
      }
    });
  }

  protected onChangeInputDocumentNext(
    collaboratorFound: ICollaboratorAssigned[]
  ) {
    if (collaboratorFound === null || collaboratorFound.length == 0) {
      this.printErrors.message = 'No se encontró colaborador';
      this.formAssignedTeam.controls['inputDocumentNumber'].setErrors({
        error: true,
      });

      this.cleanFields();

      return;
    } else {
      const [collaboratorObj] = collaboratorFound;
      this.collaboratorCurrentForm = collaboratorObj;
      this.formAssignedTeam.controls['inputDocumentNumber'].setErrors(null);
      const collaboratorNameLong = `${collaboratorObj.nombres} ${collaboratorObj.apellido_pat} ${collaboratorObj.apellido_mat}`;

      const nameLongFormmated = util.toCapitalizeCase(collaboratorNameLong);

      this.setInfoCollaborator(
        nameLongFormmated,
        collaboratorObj.cod_puesto,
        collaboratorObj.nivel
      );

      // this.getAssignedActualOfCollaborator();
      // this.disabledInputAssignament();
    }
  }

  fillCboxProfile() {
    this.cboxService.findAllProfiles().subscribe((profileList) => {
      this.profileList = profileList;
    });
  }

  onChangeDateStart$() {
    this.formAssignedTeam.controls['dpDateStart'].valueChanges.subscribe(
      (dateStart) => {
        const dateEnd = this.formAssignedTeam.controls['dpDateEnd'].value;
        const isValidDateEnd =
          this.formAssignedTeam.controls['dpDateEnd'].valid;
        const { fecha_ini_planificada, fecha_ini_real } = this.serviceResponse;
        let date_initial_service = fecha_ini_real
          ? fecha_ini_real
          : fecha_ini_planificada;

        if (date_initial_service && dateStart) {
          const isValidDatesInit_start = util.isHighDateEnd(
            dateStart,
            date_initial_service
          );

          if (isValidDatesInit_start) {
            this.printErrors.message = 'Fecha fuera de límite';

            this.formAssignedTeam.controls['dpDateStart'].setErrors({
              error: true,
            });
          } else {
            if (dateStart && dateEnd && isValidDateEnd) {
              this.isValidDatesStartToEnd(dateStart, dateEnd);
              // this.getAssignedActualOfCollaborator();
              // this.onChangeInputAsignmentNext();
              this.operationsNext();
            }
          }
        }
      }
    );
  }

  onChangeDateEnd$() {
    this.formAssignedTeam.controls['dpDateEnd'].valueChanges.subscribe(
      (dateEnd) => {
        const dateStart = this.formAssignedTeam.controls['dpDateStart'].value;
        const isValidDateStart =
          this.formAssignedTeam.controls['dpDateStart'].valid;

        const { fecha_fin_planificada, fecha_fin_real } = this.serviceResponse;

        let date_final_service = fecha_fin_real
          ? fecha_fin_real
          : fecha_fin_planificada;

        if (date_final_service && dateEnd) {
          const isValidDatesInit_fin = util.isHighDateEnd(
            date_final_service,
            dateEnd
          );

          if (isValidDatesInit_fin) {
            this.printErrors.message = 'Fecha fuera de límite';

            this.formAssignedTeam.controls['dpDateEnd'].setErrors({
              error: true,
            });
          } else {
            if (dateStart && dateEnd && isValidDateStart) {
              this.isValidDatesStartToEnd(dateStart, dateEnd, true);
              // this.getAssignedActualOfCollaborator();
              // this.onChangeInputAsignmentNext();
              this.operationsNext();
            }
          }
        }
      }
    );
  }

  onCancel() {
    this.cleanAllFields();
    this.formAssignedTeam.controls['inputDocumentNumber'].enable();
    this.serviceResponse.cod_asignacion = undefined;
  }

  private getFormAssignedTeam(): IAssignedCollaboratorBody {
    const route = this.activatedRoute.snapshot.paramMap;
    let cod_servicio = route.get('cod_servicio');

    const {
      dpDateStart,
      dpDateEnd,
      cboxProfile,
      cboxLevel,
      inputAssignament,
      inputTariff,
    } = this.formAssignedTeam.value;
    const dateStart = util.timestampFormat(dpDateStart)!;
    const dateEnd = util.timestampFormat(dpDateEnd)!;
    const { cod_colaborador } = this.collaboratorCurrentForm;

    if (!cod_servicio) {
      cod_servicio = this.serviceResponse.cod_servicio;
    }

    const dataFormBody: IAssignedCollaboratorBody = {
      cod_servicio: parseInt(cod_servicio!),
      cod_colaborador,
      percent: inputAssignament,
      fecha_ini: dateStart,
      fecha_fin: dateEnd,
      horas_asignadas: this.assignmentHourTotal,
      cod_puesto: cboxProfile,
      nivel: cboxLevel,
      tarifa: inputTariff,
    };

    if (this.serviceResponse?.cod_asignacion) {
      dataFormBody['cod_asignacion'] = this.serviceResponse.cod_asignacion;
    }

    console.log(dataFormBody);

    return dataFormBody;
  }

  private getAssignedHours(dateStart: string | Date, dateEnd: string | Date) {
    this.assignedTeamService
      .getHourAssigned(dateStart, dateEnd)
      .subscribe((hoursTotal) => {
        console.warn('hourAssigned');
        console.log(hoursTotal);
        // this.onChangeInputAsignmentNext();
        this.assignmentHour = hoursTotal.horas_asignadas_asignacion_total;
        this.onChangeInputAsignmentNext();
        // TODO
        this.getAssignedActualOfCollaborator();
      });
  }

  protected getAssignedActualOfCollaborator() {
    if (this.isValidAssignedFields) {
      const dpDateStart = this.formAssignedTeam.controls['dpDateStart'].value;
      const dpDateEnd = this.formAssignedTeam.controls['dpDateEnd'].value;

      const dateStartFormatted = util.timestampFormat(dpDateStart)!;
      const dateEndFormatted = util.timestampFormat(dpDateEnd)!;

      this.assignedTeamService
        .collaboratorMaxAccumPercent(
          dateStartFormatted,
          dateEndFormatted,
          this.collaboratorCurrentForm.cod_colaborador
        )
        .subscribe((assignamentActual) => {
          const { maximo_porcentaje_acumulado } = assignamentActual;
          this.printErrors.hint = `Disponible: ${
            100 - maximo_porcentaje_acumulado
          }%`;
          this.collaboratorCurrentForm['asignacionAcumulada'] =
            maximo_porcentaje_acumulado;

          this.avaibleAssignment = 100 - maximo_porcentaje_acumulado;
        });
    }
  }

  // reverse false:valida fecha_inicio menor a fecha_fin
  // reverse true: valida fecha_fin mayor a fecha inicio
  private isValidDatesStartToEnd(
    dateStart: string | Date,
    dateEnd: string | Date,
    reverse = false,
    orEquals = false
  ): boolean {
    let isDateValid = false;

    if (orEquals) {
      isDateValid = util.isHighDateEnd(dateStart, dateEnd, true);
    } else {
      isDateValid = util.isHighDateEnd(dateStart, dateEnd);
    }

    if (isDateValid) {
      this.formAssignedTeam.controls['dpDateEnd'].setErrors(null);
      this.formAssignedTeam.controls['dpDateStart'].setErrors(null);

      return true;
    } else {
      if (!reverse) {
        this.formAssignedTeam.controls['dpDateStart'].setErrors({
          error: true,
        });

        return false;
      } else {
        this.formAssignedTeam.controls['dpDateEnd'].setErrors({
          error: true,
        });

        return false;
      }
    }
  }

  private get isValidAssignedFields() {
    const dpDateStart = this.formAssignedTeam.controls['dpDateStart'].valid;
    const dpDateEnd = this.formAssignedTeam.controls['dpDateEnd'].valid;
    const isValidDocumentNumber =
      this.formAssignedTeam.controls['inputDocumentNumber'].valid;

    if (dpDateStart && dpDateEnd && isValidDocumentNumber) {
      return true;
    }
    return false;
  }

  // private disabledInputAssignament() {
  //   if (this.isValidAssignedFields) {
  //     this.formAssignedTeam.controls['inputAssignament'].enable();
  //   } else {
  //     this.formAssignedTeam.controls['inputAssignament'].disable();
  //   }
  // }

  // Utils
  private cleanFields() {
    this.cleanInfoCollaborator();
    this.printErrors.hint = '';
    this.productionPlannedCalc = 0;
  }

  private setTarifaByDefault() {
    const { tarifa } = this.serviceResponse;
    this.formAssignedTeam.controls['inputTariff'].setValue(tarifa);
  }

  private setInfoCollaborator(
    names: string,
    profile: string | number,
    level: string
  ) {
    this.formAssignedTeam.patchValue({
      inputName: names,
      cboxProfile: profile,
      cboxLevel: level,
    });
  }

  private cleanInfoCollaborator() {
    this.formAssignedTeam.patchValue({
      inputName: '',
      cboxProfile: '',
      cboxLevel: '',
      inputAssignament: '',
    });
  }

  cleanAllFields() {
    this.cleanInfoCollaborator();
    // this.formAssignedTeam.controls['inputAssignament'].disable();
    this.formAssignedTeam.patchValue({
      inputDocumentNumber: null,
      dpDateStart: null,
      dpDateEnd: null,
    });
  }
}
