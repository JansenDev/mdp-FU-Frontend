import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractImboxService } from 'src/app/core/services/contract-imbox.service';
@Component({
  selector: 'app-contract-imbox',
  templateUrl: './contract-imbox.component.html',
  styleUrls: ['./contract-imbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContractImboxComponent implements OnInit {
  formFilter: FormGroup;

  // ^TMP
  displayedColumns: string[] = [
    'dateReg',
    'client',
    'businessLine',
    'profile',
    'docNumber',
    'names',
    'modality',
    'amount',
    'bonus',
    'eps',
    'sctr',
    'status',
    'dateApproval',
    'action',
  ];

  dataSource = [];
  contractImboxList: any;

  constructor(
    private formBuilder: FormBuilder,
    private contractImboxService: ContractImboxService
  ) {
    this.formFilter = this.formBuilder.group({
      filterForm: [
        {
          cboxClient: null,
          cboxLN: null,
          inputDocNumber: null,
          inputNames: null,
          cboxStatus: null,
        },
      ],
    });
  }

  ngOnInit(): void {
    this.getContractSolicitudes();
  }

  getContractSolicitudes() {
    this.contractImboxService
      .findContractSolicitudeBy()
      .subscribe((contractImboxList) => {
        this.dataSource = contractImboxList;
      });
  }

  ngSubmit() {
    console.log('send filtered');
    let { cboxClient, cboxLN, inputDocNumber, inputNames, cboxStatus } =
      this.formFilter.value.filterForm;

    console.log(this.formFilter.value);

    this.contractImboxService
      .findContractSolicitudeBy(
        cboxClient,
        cboxLN,
        inputDocNumber,
        inputNames,
        cboxStatus
      )
      .subscribe({
        next: (contractImboxList) => {
          this.dataSource = contractImboxList;
        },
      });
  }

  onCancel() {
    this.formFilter.reset({
      filterForm: {
        cboxClient: null,
        cboxLN: null,
        inputDocNumber: null,
        inputNames: null,
        cboxStatus: null,
      },
    });
    this.getContractSolicitudes();
  }
}
