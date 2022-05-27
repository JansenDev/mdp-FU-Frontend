import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
// model
import { IBusinessLine } from 'src/app/core/models/businessLine.model';
import { IClientResponse } from 'src/app/core/models/client.model';
import { IHiringRequest } from 'src/app/core/models/hiring-request.model';
import { IProfileResponse } from 'src/app/core/models/profile.model';
import { ISalaryBandReponse } from 'src/app/core/models/salaryBand.model';
// service
import { CboxService } from 'src/app/core/services/cbox.service';
import { ClientService } from 'src/app/core/services/client.service';
import { ContractService } from 'src/app/core/services/contract.service';
import { HiringRequestService } from 'src/app/core/services/hiring-request.service';
import { NotificationService } from 'src/app/core/services/notification.service';
// utils
import { getToken } from 'src/app/core/utils/token.storage';
import { DOCUMENT_TYPY_LENGTH } from '../../core/constants/resource.constants';
import * as util from '../../core/utils/utilities.util';

@Component({
  selector: 'app-hiring-request',
  templateUrl: './hiring-request.component.html',
  styleUrls: ['./hiring-request.component.scss'],
})
export class HiringRequestComponent implements OnInit {
  formHiringRequest: FormGroup;
  clientList: IClientResponse[] = [] as IClientResponse[];
  businessLineList: IBusinessLine[] = [] as IBusinessLine[];
  profileList: IProfileResponse[] = [] as IProfileResponse[];
  // EPSList: IEPS[] = [] as IEPS[];
  salaryBandObj: ISalaryBandReponse = {
    cod_banda_salarial: null,
    maximo: 0,
    minimo: 0,
  };
  documentMaxLength: number = DOCUMENT_TYPY_LENGTH['DNI'];
  isvalidDocumentNumber = true;
  fileCv: any = undefined;
  clm_validacion = 0;
  factorPlanilla = 0;
  factorRxh = 0;
  rem_validacion = 0;
  bono_validacion = 0;
  auxProd = 0;
  minProd = 1.3;

  // amountCurrent: IEPS = {} as IEPS;
  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private cboxService: CboxService,
    private contractService: ContractService,
    private clientService: ClientService,
    private hiringRequestService: HiringRequestService,
    private router: Router
  ) {
    this.formHiringRequest = this.formBuilder.group({
      cBoxDocumentType: ['DNI'],
      inputDocumentNumber: ['', [Validators.pattern(/^\d{8,15}$/)]],
      inputNameColl: [null, [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)]],
      inputLastname: [null, [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)]],
      inputLastnameMt: [null, [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)]],
      inputBithDate: [null, Validators.required],
      inputPhone: [null, [Validators.pattern(/^\d{9,11}$/)]],
      inputEmail: [null, [Validators.email]],
      inputAddress: [null, Validators.required],
      inputDistrict: [null, Validators.required],
      inputProvince: [null, Validators.required],
      // contract
      cBoxClient: [null, Validators.required],
      cBoxBusinessLine: [null, Validators.required],
      cBoxProfile: [null, Validators.required],
      cBoxLevel: [null, Validators.required],
      cBoxmodality: [null, Validators.required],
      inputRemuneration: [null, Validators.pattern(/^[1-9]\d{2,4}$/)],
      //optionals
      inputMonthlyBonus: [null, Validators.pattern(/^\d{3,5}$/)],
      inputDateStart: [null, Validators.required],
      inputDateEnd: [null, Validators.required],
      inputCondition: [null],
      // Ajustes
      cboxCompany: [null, [Validators.required]],
      cboxSex: [null, Validators.required],
      cboxArea: [null],
      inputWorkingHours: [null],
      inputTarifa: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*(\.[0-9]{0,2})?$/),
        ],
      ],
      inputProductivity: [{ value: null, disabled: true }],
      cboxTeamAsignment: [null],
      inputJefeResponsable: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fillAllCBoxInit();
    this.setSpanishDateFormat();
    this.getFactors();
  }

  fillAllCBoxInit() {
    this.fillCboxClient();
    this.fillCboxBusinessLine();
    this.fillCboxProfile();
    // this.fillCboxEPS();

    this.onChangeCboxDocumentType();
    this.onChangeInputDocumentNumber();
    this.onChangeCboxLevel();
    this.onChangeCboxProfile();
    this.onChangeInputDateStart();
    this.onChangeInputDateEnd();
    this.onchageTariff$();

    this.onChangeModality$();
    this.onChangeRemuneration$();
    this.onChangeBonus$();
    this.onChangeTariff$();
  }

  setSpanishDateFormat() {
    this._locale = 'es';
    this._adapter.setLocale(this._locale);
  }

  onChangeInputDateStart() {
    let isValidDates = false;
    this.formHiringRequest.controls['inputDateStart'].valueChanges.subscribe(
      (inputDateStart) => {
        const inputDateEnd =
          this.formHiringRequest.controls['inputDateEnd'].value;

        if (inputDateStart && inputDateEnd) {
          isValidDates = util.isHighDateEnd(inputDateStart, inputDateEnd);

          if (isValidDates) {
            this.formHiringRequest.controls['inputDateStart'].setErrors(null);
            this.formHiringRequest.controls['inputDateEnd'].setErrors(null);
          } else {
            this.formHiringRequest.controls['inputDateStart'].setErrors({
              incorrect: true,
            });
          }
        }
      }
    );
  }

  onChangeInputDateEnd() {
    let isValidDates = false;

    this.formHiringRequest.controls['inputDateEnd'].valueChanges.subscribe(
      (inputDateEnd) => {
        const inputDateStart =
          this.formHiringRequest.controls['inputDateStart'].value;

        if (inputDateStart && inputDateEnd) {
          isValidDates = util.isHighDateEnd(inputDateStart, inputDateEnd);

          if (isValidDates) {
            this.formHiringRequest.controls['inputDateEnd'].setErrors(null);
            this.formHiringRequest.controls['inputDateStart'].setErrors(null);
          } else {
            this.formHiringRequest.controls['inputDateEnd'].setErrors({
              incorrect: true,
            });
          }
        }
      }
    );
  }

  onChangeCboxLevel() {
    this.formHiringRequest.controls['cBoxLevel'].valueChanges.subscribe(
      (levelSelected) => {
        const idProfile: number = parseInt(
          this.formHiringRequest.controls['cBoxProfile'].value
        );

        if (idProfile && levelSelected) {
          this.cboxService
            .findSalaryBandByIdProfileAndLevel(idProfile, levelSelected)
            .subscribe({
              next: (salaryBandFound) => {
                this.salaryBandObj = salaryBandFound[0];
              },
              error: (errorResponse: HttpErrorResponse) => {
                const { message } = errorResponse.error;
                this.notification.toast('warning', message, 'WARNING');
                this.salaryBandObj = {
                  cod_banda_salarial: null,
                  maximo: 0,
                  minimo: 0,
                };
              },
            });
        }
      }
    );
  }

  onChangeCboxProfile() {
    this.formHiringRequest.controls['cBoxProfile'].valueChanges.subscribe(
      (idProfileSelected) => {
        const levelName: string =
          this.formHiringRequest.controls['cBoxLevel'].value;
        if (levelName && idProfileSelected) {
          this.cboxService
            .findSalaryBandByIdProfileAndLevel(
              parseInt(idProfileSelected),
              levelName
            )
            .subscribe({
              next: (salaryBandFound) => {
                this.salaryBandObj = salaryBandFound[0];
              },
              error: (errorResponse: HttpErrorResponse) => {
                const { message } = errorResponse.error;
                this.notification.toast('warning', message, 'WARNING', 7000);
                this.salaryBandObj = {
                  cod_banda_salarial: null,
                  maximo: 0,
                  minimo: 0,
                };
              },
            });
        }
      }
    );
  }

  onChangeCboxDocumentType() {
    this.formHiringRequest.controls['cBoxDocumentType'].valueChanges.subscribe({
      next: (documentType) => {
        const type = documentType as keyof typeof DOCUMENT_TYPY_LENGTH;

        this.documentMaxLength = DOCUMENT_TYPY_LENGTH[type];
      },
    });
  }

  onChangeInputDocumentNumber() {
    this.formHiringRequest.controls[
      'inputDocumentNumber'
    ].valueChanges.subscribe({
      next: (documentNumber) => {
        if (this.documentMaxLength === documentNumber.length) {
          this.contractService
            .isValidDocumentNumber(documentNumber)
            .subscribe((isExistDocumentNumber) => {
              if (isExistDocumentNumber) {
                this.isvalidDocumentNumber = false;
              } else {
                this.isvalidDocumentNumber = true;
              }
            });
        }
      },
    });
  }

  onChangeModality$() {
    this.formHiringRequest.controls['cBoxmodality'].valueChanges.subscribe({
      next: this.calcProductivity.bind(this),
    });
  }

  onChangeRemuneration$() {
    this.formHiringRequest.controls['inputRemuneration'].valueChanges.subscribe(
      {
        next: this.calcProductivity.bind(this),
      }
    );
  }

  onChangeBonus$() {
    this.formHiringRequest.controls['inputMonthlyBonus'].valueChanges.subscribe(
      {
        next: this.calcProductivity.bind(this),
      }
    );
  }

  onChangeTariff$() {
    this.formHiringRequest.controls['inputTarifa'].valueChanges.subscribe({
      next: this.calcProductivity.bind(this),
    });
  }

  fillCboxClient() {
    const { id_sesion } = getToken();

    this.clientService.findClientByUser(id_sesion).subscribe({
      next: (clientList) => {
        this.clientList = clientList;
      },
      error: (err) => console.log(err),
    });
  }

  fillCboxBusinessLine() {
    this.cboxService.findAllBusinessLine().subscribe({
      next: (businessLineList) => {
        this.businessLineList = businessLineList;
      },
    });
  }

  fillCboxProfile() {
    this.cboxService.findAllProfiles().subscribe({
      next: (profileList) => {
        this.profileList = profileList;
      },
    });
  }

  upload($event: any) {
    if ($event.target.files.length > 0) {
      const [file] = $event.target.files;

      this.fileCv = {
        file: file,
        filename: file.name,
      };

      return;
    }
    this.fileCv = undefined;
  }

  onSubmitHiringRquest() {
    const bonus = this.formHiringRequest.controls['inputMonthlyBonus'].value;
    let bonusParsed = parseInt(bonus);

    if (bonus !== null && bonusParsed > 600) {
      this.notification.toast(
        'error',
        'Bono no puede ser mayor a S/ 600',
        'ERROR',
        5000
      );
      return;
    }

    if (!this.isvalidDocumentNumber) {
      this.notification.toast('info', 'Existe contrato vigente', ' Info');
      return;
    }

    if (this.formHiringRequest.valid && this.isvalidDocumentNumber) {
      const formValues: IHiringRequest = this.hiringContractBody;

      if (this.fileCv) {
        this.hiringRequestService
          .uploadCv(this.fileCv)
          .subscribe((uploadResponse) => {
            console.log(uploadResponse);
            if (uploadResponse.error) {
              this.notification.toast(
                'error',
                uploadResponse.message,
                'ERROR',
                7000
              );
              return;
            }
            formValues['cv'] = uploadResponse.filename;

            this.registerHiringRequestNext(formValues);
          });
      } else {
        this.registerHiringRequestNext(formValues);
      }
    }
  }

  protected registerHiringRequestNext(formValues: IHiringRequest) {
    this.hiringRequestService.registerHiringRequest(formValues).subscribe({
      next: (registerResponse) => {
        console.log(registerResponse);
        const isError = registerResponse.error;

        if (!isError) {
          this.notification.toast(
            'success',
            registerResponse.message,
            'SUCCESS'
          );
          formValues['cv'] = undefined;
          this.onCancel();
          return;
        }
        this.notification.toast('error', registerResponse.message, 'ERROR');
      },

      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);

        const { message } = errorResponse.error;
        this.notification.toast('error', message, 'ERROR', 7000);
      },
    });
  }

  onchageTariff$() {
    this.formHiringRequest.controls['inputTarifa'].valueChanges.subscribe({
      next: this.calcProductivity.bind(this),
      error: (err) => console.log(err),
    });
  }

  private calcProductivity() {
    const inputTariff = this.formHiringRequest.controls['inputTarifa'].value;
    const inputRemuneration =
      this.formHiringRequest.controls['inputRemuneration'].value;
    const inputBonus =
      this.formHiringRequest.controls['inputMonthlyBonus'].value;

    const modality = this.formHiringRequest.controls['cBoxmodality'].value;

    if (inputRemuneration && inputTariff && modality) {
      let typeParameter: 'factor_planilla' | 'factor_rxh_practicas';

      if (modality === 'planilla') {
        typeParameter = 'factor_planilla';
      } else {
        typeParameter = 'factor_rxh_practicas';
      }

      this.hiringRequestService
        .getParameters(typeParameter)
        .subscribe((parameterResponse) => {
          const [parameterObj] = parameterResponse;

          const parameter = parseFloat(parameterObj.valor_num_1);
          const remuneration = parseFloat(inputRemuneration);
          let bonus = 0;
          const tariff = parseFloat(inputTariff);

          if (inputBonus || inputBonus !== null) {
            bonus = parseFloat(inputBonus);

            if (inputBonus === '') {
              bonus = 0;
            }
          }
          const clm = remuneration * parameter + bonus;

          let resultProductity = tariff / clm;

          this.formHiringRequest.controls['inputProductivity'].setValue(
            resultProductity.toFixed(2)
          );
          this.auxProd = this.formHiringRequest.controls['inputProductivity'].value;
        });
    }
  }

  onCancel() {
    this.cleanForm();
  }

  get hiringContractBody() {
    const {
      cBoxDocumentType,
      inputDocumentNumber,
      inputNameColl,
      inputLastname,
      inputLastnameMt,
      inputBithDate,
      inputPhone,
      inputEmail,
      inputAddress,
      inputDistrict,
      inputProvince,
      cBoxClient,
      cBoxBusinessLine,
      cBoxProfile,
      cBoxLevel,
      cBoxmodality,
      inputRemuneration,
      inputDateStart,
      inputDateEnd,
      inputMonthlyBonus,
      inputCondition,
      //
      cboxCompany,
      cboxSex,
      cboxArea,
      inputWorkingHours,
      inputTarifa,
      cboxTeamAsignment,
      inputJefeResponsable,
    } = this.formHiringRequest.value;

    let hiringRequestBody: IHiringRequest = {
      tipo_documento: cBoxDocumentType,
      nro_documento: inputDocumentNumber,
      nombre: inputNameColl,
      ape_paterno: inputLastname,
      ape_materno: inputLastnameMt,
      fecha_nacimiento: util.timestampFormat(inputBithDate)!,
      nro_celular: parseInt(inputPhone),
      correo: inputEmail,
      direccion: inputAddress,
      distrito: inputDistrict,
      provincia: inputProvince,
      cod_cliente: cBoxClient,
      cod_linea_negocio: cBoxBusinessLine,
      cod_puesto: cBoxProfile,
      nivel: cBoxLevel,
      modalidad: cBoxmodality,
      remuneracion: inputRemuneration,
      fecha_inicio: util.timestampFormat(inputDateStart)!,
      fecha_fin: util.timestampFormat(inputDateEnd)!,
      bono_men: inputMonthlyBonus ? parseInt(inputMonthlyBonus) : null,
      condicional_adicional: inputCondition,
      // ajustes
      empresa: cboxCompany,
      sexo: cboxSex,
      condicion_proyecto_area: cboxArea,
      horario_laboral: inputWorkingHours,
      tarifa_mensual: inputTarifa,
      asignacion_equipo: cboxTeamAsignment,
      jefe_responsable_directo: inputJefeResponsable,
    };

    return hiringRequestBody;
  }

  get cBoxBearCostValue() {
    return this.formHiringRequest.controls['cBoxBearCost'].value;
  }
  get cBoxEPSValue() {
    return this.formHiringRequest.controls['cBoxEPS'].value;
  }

  get cboxBusinessLine() {
    return this.formHiringRequest.controls['cBoxBusinessLine'].value;
  }

  //* utilities
  private cleanForm() {
    this.formHiringRequest.reset({
      cBoxDocumentType: 'DNI',
      inputDocumentNumber: '',
      cBoxEPS: null,
      cBoxBearCost: 'parcial',
      rbSCTR: false,
    });

    this.isvalidDocumentNumber = true;
    this.salaryBandObj = {
      cod_banda_salarial: null,
      maximo: 0,
      minimo: 0,
    };

    this.fileCv = undefined;
    this.cleanInputUpload();
  }

  private cleanInputUpload() {
    (
      document.getElementById('ngx-mat-file-input-0') as HTMLInputElement
    ).value = '';
    (
      document.getElementById('ngx-mat-file-input-1') as HTMLInputElement
    ).value = '';
    (
      document.getElementById('ngx-mat-file-input-2') as HTMLInputElement
    ).value = '';

    // this.router.navigate(['/home']);
  }

  getFactors(){
    this.hiringRequestService.getParameters('factor_planilla')
    .subscribe((parameterResponse) => {
      const [parameterObj] = parameterResponse;
      this.factorPlanilla = parseFloat(parameterObj.valor_num_1);
      console.log('planilla: ', this.factorPlanilla);
    });

    this.hiringRequestService.getParameters('factor_rxh_practicas')
    .subscribe((parameterResponse) => {
      const [parameterObj] = parameterResponse;
      this.factorRxh = parseFloat(parameterObj.valor_num_1);
      console.log('rxh: ', this.factorRxh);
    });
  }

  //Para calcular el clm mientras se ingresan los valores. Se puede optimizar usando eventos/valores que ya se tienen
  calcClmValidacion(){
    console.log('clm: ', this.clm_validacion);
    let bonoInput = this.formHiringRequest.controls['inputMonthlyBonus'].value;
    if (bonoInput){
      this.bono_validacion = parseFloat(bonoInput);
    } else {
      this.bono_validacion = 0;
    }
    let remInput = this.formHiringRequest.controls['inputRemuneration'].value;
    if (remInput){
      this.rem_validacion = parseFloat(remInput);
    } else {
      this.rem_validacion = 0;
    }

    const modality = this.formHiringRequest.controls['cBoxmodality'].value;
    if (modality == 'planilla'){
      this.clm_validacion = this.rem_validacion * this.factorPlanilla + this.bono_validacion
    } else {
        this.clm_validacion = this.rem_validacion * this.factorRxh + this.bono_validacion
    }
  }


}
