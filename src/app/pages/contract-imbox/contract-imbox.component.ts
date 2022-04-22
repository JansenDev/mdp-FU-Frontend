import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IContractImbox } from 'src/app/core/models/contract-imbox-model';
import { ContractImboxService } from 'src/app/core/services/contract-imbox.service';
import * as util from '../../core/utils/utilities.util';
@Component({
  selector: 'app-contract-imbox',
  templateUrl: './contract-imbox.component.html',
  styleUrls: ['./contract-imbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContractImboxComponent implements OnInit {
  formFilter: FormGroup;
  @ViewChild(MatPaginator)
  paginator: MatPaginator = {} as MatPaginator;
  dataSource: MatTableDataSource<IContractImbox> =
    new MatTableDataSource<IContractImbox>([]);

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

  constructor(
    private formBuilder: FormBuilder,
    private contractImboxService: ContractImboxService,
    private router: Router
  ) {
    this.formFilter = this.formBuilder.group({
      filterForm: [
        {
          cboxClient: '',
          cboxLN: '',
          inputDocNumber: null,
          inputNames: null,
          cboxStatus: '',
        },
      ],
    });
  }

  ngOnInit(): void {
    this.fillTableHiringRequests();
  }

  fillTableHiringRequests() {
    this.contractImboxService
      .filterHiringRequesBy()
      .subscribe((contractImboxList) => {
        this.dataSource = new MatTableDataSource<IContractImbox>(
          contractImboxList
        );
        this.dataSource.paginator = this.paginator;
      });
  }

  onApproveHiringRequest(hiringRequestSelected: IContractImbox) {
    this.router.navigate([
      'contract-imbox',
      'approveHiringRequestComponent',
      hiringRequestSelected.cod_solicitud_contratacion,
    ]);
  }

  ngSubmit() {
    let { cboxClient, cboxLN, inputDocNumber, inputNames, cboxStatus } =
      this.formFilter.value.filterForm;

    // const inputNamesTrim = util.trimAllSpaces(inputNames);

    this.contractImboxService
      .filterHiringRequesBy(
        cboxClient,
        cboxLN,
        inputDocNumber,
        inputNames,
        cboxStatus
      )
      .subscribe({
        next: (contractImboxList) => {
          this.dataSource = new MatTableDataSource<IContractImbox>(
            contractImboxList
          );
          this.dataSource.paginator = this.paginator;
        },
      });
  }

  onClean() {
    this.formFilter.reset({
      filterForm: {
        cboxClient: '',
        cboxLN: '',
        inputDocNumber: null,
        inputNames: null,
        cboxStatus: '',
      },
    });
    // this.getContractSolicitudes();
  }

  isPendingHiringRequest(pendingStatus: string): boolean {
    let status = false;

    if (
      pendingStatus === 'Pendiente Aprobacion' ||
      pendingStatus === 'Pendiente Aprobacion GG'
    ) {
      status = true;
    }
    return status;
  }

}
