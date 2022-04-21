import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IContractImbox } from 'src/app/core/models/contract-imbox-model';
import { ContractImboxService } from 'src/app/core/services/contract-imbox.service';
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
        this.dataSource = new MatTableDataSource<IContractImbox>(
          contractImboxList
        );
        this.dataSource.paginator = this.paginator;
      });
  }

  ngSubmit() {
    let { cboxClient, cboxLN, inputDocNumber, inputNames, cboxStatus } =
      this.formFilter.value.filterForm;

    if (cboxClient || cboxLN || inputDocNumber || inputNames || cboxStatus) {
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
            this.dataSource = new MatTableDataSource<IContractImbox>(
              contractImboxList
            );
            this.dataSource.paginator = this.paginator;
          },
        });
    }
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
