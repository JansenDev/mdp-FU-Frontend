import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// model
import { IBusinessLine } from 'src/app/core/models/businessLine.model';
import { IClientResponse } from 'src/app/core/models/client.model';
import { IEPS } from 'src/app/core/models/EPS.model';
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
import { getToken, setToken } from 'src/app/core/utils/token.storage';
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
  EPSList: IEPS[] = [] as IEPS[];
  salaryBandObj: ISalaryBandReponse = {
    cod_banda_salarial: null,
    maximo: 0,
    minimo: 0,
  };
  documentMaxLength: number = DOCUMENT_TYPY_LENGTH['DNI'];
  isvalidDocumentNumber = true;

  amountCurrent: IEPS = {} as IEPS;
  constructor(
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private cboxService: CboxService,
    private contractService: ContractService,
    private clientService: ClientService,
    private hiringRequest: HiringRequestService
  ) {
    setToken({ id_sesion: 40 });

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
      cBoxEPS: [null],
      cBoxBearCost: ['parcial'],
      rbSCTR: [false],
      inputDateStart: [null, Validators.required],
      inputDateEnd: [null, Validators.required],
      inputCondition: [null],
    });
  }

  ngOnInit(): void {
    this.fillAllCBoxInit();
  }

  fillAllCBoxInit() {
    this.fillCboxClient();
    this.fillCboxBusinessLine();
    this.fillCboxProfile();
    this.fillCboxEPS();

    this.onChangeCboxDocumentType();
    this.onChangeInputDocumentNumber();
    this.onChangeCboxLevel();
    this.onChangeCboxProfile();
    this.onChangeInputDateStart();
    this.onChangeInputDateEnd();
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

  setAmountCurrent(EPSSelected: IEPS) {
    this.amountCurrent = EPSSelected;
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

  fillCboxClient() {
    const { id_sesion } = JSON.parse(getToken());

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

  fillCboxEPS() {
    this.cboxService.findAllEPS().subscribe({
      next: (EPSList) => {
        this.EPSList = EPSList;
      },
    });
  }

  onSubmitHiringRquest() {
    if (!this.isvalidDocumentNumber) {
      this.notification.toast('info', 'Existe contrato vigente', ' Info');
      return;
    }

    if (this.formHiringRequest.valid && this.isvalidDocumentNumber) {
      const formValues: IHiringRequest = this.hiringContractBody;

      this.hiringRequest.registerHiringRequest(formValues).subscribe({
        next: (status) => {
          this.notification.toast('success', status.message, ' SUCCESS', 5000);
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);

          const { message } = errorResponse.error;
          this.notification.toast('error', message, 'ERROR', 7000);
        },
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

      cBoxEPS,
      cBoxBearCost,
      rbSCTR,
      inputMonthlyBonus,
      inputCondition,
    } = this.formHiringRequest.value;

    let hiringRequestBody: IHiringRequest = {
      tipo_documento: cBoxDocumentType,
      nro_documento: inputDocumentNumber,
      nombre: inputNameColl,
      ape_paterno: inputLastname,
      ape_materno: inputLastnameMt,
      fecha_nacimiento: util.timestampFormat(inputBithDate)!,
      nro_celular: inputPhone,
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

      cod_eps: cBoxEPS,
      eps_parcial_total: cBoxBearCost,
      ind_sctr: rbSCTR,
      bono_men: inputMonthlyBonus ? parseInt(inputMonthlyBonus) : null,
      condicional_adicional: inputCondition,
    };

    return hiringRequestBody;
  }

  get cBoxBearCostValue() {
    return this.formHiringRequest.controls['cBoxBearCost'].value;
  }
  get cBoxEPSValue() {
    return this.formHiringRequest.controls['cBoxEPS'].value;
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
  }
}
