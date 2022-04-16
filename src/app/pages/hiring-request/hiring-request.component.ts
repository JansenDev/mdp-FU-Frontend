import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBusinessLine } from 'src/app/core/models/businessLine.model';
import { IClientResponse } from 'src/app/core/models/client.model';
import { IProfileResponse } from 'src/app/core/models/profile.model';
import { CboxService } from 'src/app/core/services/cbox.service';
import { ClientService } from 'src/app/core/services/client.service';
import { ContractService } from 'src/app/core/services/contract.service';
import { NotificationService } from 'src/app/core/services/notification.service';
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
  documentMaxLength: number = DOCUMENT_TYPY_LENGTH['DNI'];
  isvalidDocumentNumber = true;
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
      inputSalaryBand: ['', Validators.pattern(/^\d{3,5}$/)],
      cBoxmodality: ['', Validators.required],
      inputRemuneration: ['', Validators.pattern(/^\d{3,5}$/)],
      inputMonthlyBonus: ['', Validators.pattern(/^\d{3,5}$/)],
      rbEPS: [''],
      rbSCTR: [''],
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
    this.onChangeDocumentType();
    this.onChangeDocumentNumber();
  }

  onChangeDocumentType() {
    this.formHiringRequest.controls['cBoxDocumentType'].valueChanges.subscribe({
      next: (documentType) => {
        const type = documentType as keyof typeof DOCUMENT_TYPY_LENGTH;

        this.documentMaxLength = DOCUMENT_TYPY_LENGTH[type];
      },
    });
  }

  onChangeDocumentNumber() {
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
    this.cboxService.findBusinessLine().subscribe({
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

  onSubmitHiringRquest() {
    if (!this.isvalidDocumentNumber) {
      this.notification.toast('error', 'Contrato vigente', ' Error');
      return;
    }

    if (this.formHiringRequest.valid && this.isvalidDocumentNumber) {
      console.log('Submit hiring request');
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
    });

    this.isvalidDocumentNumber = true;
  }
}
