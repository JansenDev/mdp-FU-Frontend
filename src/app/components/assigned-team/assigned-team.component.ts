import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ICreateServiceRequest } from 'src/app/core/models/service.model';
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
  @Input() sentService!: Partial<ICreateServiceRequest>;
  formAssignedTeam: FormGroup;

  constructor(
    private notification: NotificationService,
    private formBuilder: FormBuilder
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
      inputProfile: [{ value: null, disabled: true }],
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

    //  service created
    this.subject.subscribe((value) => {
      console.warn('value PADRE:');
      console.log(value);
      this.notification.toast('info', value, 'DATA  ');
    });

    // data service
    console.warn('ASSIGNED-TEAM');
    console.log('servicio recibido: ', this.sentService);
  }


  onChangeDateStart$() {
    this.formAssignedTeam.controls['dpDateStart'].valueChanges.subscribe(
      (dateStart) => {
        const dateEnd = this.formAssignedTeam.controls['dpDateEnd'].value;

        if (dateStart && dateEnd) {
          const x = this.isValidDatesStartToEnd(dateStart, dateEnd);
          console.log(x);
        }
      }
    );
  }

  onChangeDateEnd$() {
    this.formAssignedTeam.controls['dpDateEnd'].valueChanges.subscribe(
      (dateEnd) => {
        const dateStart = this.formAssignedTeam.controls['dpDateStart'].value;

        if (dateStart && dateEnd) {
          const x = this.isValidDatesStartToEnd(dateStart, dateEnd, true);
          console.log(x);
        }
      }
    );
  }

  // reverse false:valida fecha_inicio menor a fecha_fin
  // reverse true: valida fecha_fin mayor a fecha inicio
  private isValidDatesStartToEnd(
    dateStart: string | Date,
    dateEnd: string | Date,
    reverse = false
  ): boolean {
    let isDateValid = util.isHighDateEnd(dateStart, dateEnd);

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
