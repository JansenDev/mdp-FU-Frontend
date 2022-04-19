import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBusinessLine } from 'src/app/core/models/businessLine.model';
import { IClientResponse } from 'src/app/core/models/client.model';
import { IEPS } from 'src/app/core/models/EPS.model';
import { IProfileResponse } from 'src/app/core/models/profile.model';
import { ISalaryBandReponse } from 'src/app/core/models/salaryBand.model';
import { CboxService } from 'src/app/core/services/cbox.service';
import { ClientService } from 'src/app/core/services/client.service';
import { ContractService } from 'src/app/core/services/contract.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { getToken, setToken } from 'src/app/core/utils/token.storage';
import { DOCUMENT_TYPY_LENGTH } from '../../core/constants/resource.constants';

// TODO: dar formato a la fecha
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
  amountCurrent = 0;
  constructor(
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private cboxService: CboxService,
    private contractService: ContractService,
    private clientService: ClientService
  ) {
    setToken({ id_sesion: 40 });

    this.formHiringRequest = this.formBuilder.group({
      cBoxDocumentType: ['DNI'],
      inputDocumentNumber: ['', [Validators.pattern(/^\d{8,15}$/)]],
      inputNameColl: ['', [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)]],
      inputLastname: ['', [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)]],
      inputLastnameMt: ['', [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)]],
      inputBithDate: ['', Validators.required],
      inputPhone: ['', [Validators.pattern(/^\d{9,11}$/)]],
      inputEmail: ['', [Validators.email]],
      inputAddress: ['', Validators.required],
      inputProvince: ['', Validators.required],
      inputDistrict: ['', Validators.required],
      // contract
      cBoxClient: ['', Validators.required],
      cBoxBusinessLine: ['', Validators.required],
      cBoxProfile: ['', Validators.required],
      cBoxLevel: ['', Validators.required],
      // inputSalaryBand: ['', Validators.pattern(/^\d{3,5}$/)],
      cBoxmodality: ['', Validators.required],
      inputRemuneration: ['', Validators.pattern(/^\d{3,5}$/)],
      inputMonthlyBonus: ['', Validators.pattern(/^\d{3,5}$/)],
      cBoxEPS: [''],
      cBoxBearCost: ['MDP'],
      rbSCTR: [false],
      inputDateStart: ['', Validators.required],
      inputDateEnd: ['', Validators.required],
      inputCondition: [''],
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
  }

  setAmountCurrent(amount: string | number) {
    if (typeof amount === 'string') {
      this.amountCurrent = parseInt(amount);
      return;
    }

    this.amountCurrent = amount;
  }

  onChangeCboxLevel() {
    this.formHiringRequest.controls['cBoxLevel'].valueChanges.subscribe({
      next: (levelSelected) => {
        const idProfile: number = parseInt(
          this.formHiringRequest.controls['cBoxProfile'].value
        );

        if (idProfile && levelSelected) {
          this.cboxService
            .findSalaryBandByIdProfileAndLevel(idProfile, levelSelected)
            .subscribe((salaryBandFound) => {
              this.salaryBandObj = salaryBandFound[0];
            });
        }
      },
    });
  }

  onChangeCboxProfile() {
    this.formHiringRequest.controls['cBoxProfile'].valueChanges.subscribe({
      next: (idProfileSelected) => {
        const levelName: string =
          this.formHiringRequest.controls['cBoxLevel'].value;
        if (levelName && idProfileSelected) {
          this.cboxService
            .findSalaryBandByIdProfileAndLevel(
              parseInt(idProfileSelected),
              levelName
            )
            .subscribe((salaryBandFound) => {
              this.salaryBandObj = salaryBandFound[0];
            });
        }
      },
    });
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
      this.notification.toast('info', 'Contrato vigente', ' Info');
      return;
    }

    if (this.formHiringRequest.valid && this.isvalidDocumentNumber) {
      console.log('Submit hiring request');
      this.notification.toast('success', 'Solicitud Registrada!', ' Success');
    } else {
      console.log('Buen intento prro');
    }
  }

  onCancel() {
    this.cleanForm();
  }
  //* utilities
  private cleanForm() {
    this.formHiringRequest.reset({
      cBoxDocumentType: 'DNI',
      inputDocumentNumber: '',
      cBoxEPS: '',
      cBoxBearCost: 'MDP',
    });

    this.isvalidDocumentNumber = true;
    this.amountCurrent = 0;
    this.salaryBandObj = {
      cod_banda_salarial: null,
      maximo: 0,
      minimo: 0,
    };
  }
}
