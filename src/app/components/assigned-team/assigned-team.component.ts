import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { IProfileResponse } from 'src/app/core/models/profile.model';
import { ICreateServiceRequest } from 'src/app/core/models/service.model';
import { CboxService } from 'src/app/core/services/cbox.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import * as util from '../../core/utils/utilities.util';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
  },
];

@Component({
  selector: 'app-assigned-team',
  templateUrl: './assigned-team.component.html',
  styleUrls: ['./assigned-team.component.scss'],
})
export class AssignedTeamComponent implements OnInit {
  @Input() subject!: Subject<any>;
  formAssignedTeam: FormGroup;
  serviceResponse: any;
  printErrors = {
    name: 'null',
    message: '',
  };

  profileList: IProfileResponse[] = [];

  constructor(
    private notification: NotificationService,
    private formBuilder: FormBuilder,
    private cboxService: CboxService
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
        null,
        [Validators.required, Validators.pattern(/^[1-9][0-9]?0?$/)],
      ],
      inputTariff: [
        null,
        [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]+)?$/)],
      ],
      dpDateStart: [null, Validators.required],
      dpDateEnd: [null, Validators.required],
      inputAssignament_hour: [{ value: ' ', disabled: true }],
      inputProductionEstimated: [{ value: ' ', disabled: true }],
    });
  }

  displayedColumns: string[] = [
    'profile',
    'level',
    'documentNumber',
    'names',
    'assignment',
    'd_start',
    'd_end',
    'action_edit',
    'action_delete',
  ];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
    this.onChangeDateStart$();
    this.onChangeDateEnd$();
    this.fillCboxProfile();

    //  service info  created
    this.subject.subscribe((serviceResponse) => {

      this.serviceResponse = serviceResponse;
    });
  }

  onchangeInputDocumentNumber(){

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
            this.printErrors.message = 'Fecha incorrecta';

            this.formAssignedTeam.controls['dpDateStart'].setErrors({
              error: true,
            });
          } else {
            if (dateStart && dateEnd) {
              this.isValidDatesStartToEnd(dateStart, dateEnd);
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
            this.printErrors.message = 'Fecha incorrecta';

            this.formAssignedTeam.controls['dpDateEnd'].setErrors({
              error: true,
            });
          } else {
            if (dateStart && dateEnd) {
              this.isValidDatesStartToEnd(dateStart, dateEnd, true);
            }
          }
        }
      }
    );
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
}
