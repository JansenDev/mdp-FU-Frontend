import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, map, Subject } from 'rxjs';
import { ImboxFilterComponent } from 'src/app/components/form/imbox-filter/imbox-filter.component';
import { IContractImbox } from 'src/app/core/models/contract-imbox-model';
import { ContractImboxService } from 'src/app/core/services/contract-imbox.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { getToken } from 'src/app/core/utils/token.storage';
import * as util from '../../core/utils/utilities.util';

const GG = `GERENTE_GENERAL`;

@Component({
  selector: 'app-contract-imbox',
  templateUrl: './contract-imbox.component.html',
  styleUrls: ['./contract-imbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ImboxFilterComponent],
})
export class ContractImboxComponent implements OnInit {
  formFilter: FormGroup;
  @ViewChild(MatPaginator)
  paginator: MatPaginator = {} as MatPaginator;
  dataSource: MatTableDataSource<IContractImbox> =
    new MatTableDataSource<IContractImbox>([]);

  disableForm$: Subject<any> = new BehaviorSubject<any>(undefined);

  displayedColumns: string[] = [];

  nombrePerfil = '';

  constructor(
    private formBuilder: FormBuilder,
    private contractImboxService: ContractImboxService,
    private router: Router,
    private notification : NotificationService
  ) {
    this.formFilter = this.formBuilder.group({
      filterForm: [
        {
          cboxClient: '',
          cboxLN: '',
          cboxType: '',
          inputDocNumber: null,
          inputNames: null,
          cboxStatus: '',
        },
      ],
    });

    this.setDisplayedColumns();

    // ^TEMP TITLE PROFILE
    // this.setNombrePerfil();
  }

  // ^TEMP Start
  // setNombrePerfil() {
  //   const { userProfile } = getToken();
  //   this.nombrePerfil = userProfile || null;
  // }
  // ^TEMP END

  ngOnInit(): void {
    this.fillTableHiiringRequestByProfile();
  }

  setDisplayedColumns() {
    const displayedColumns = [
      'tipo_solicitud',
      'dateReg',
      'client',
      'businessLine',
      // 'profile',
      'docNumber',
      'names',
      'modality',
      'amount',
      'bonus',
      'status',
    ];

    if (this.userProfile === GG) {
      this.displayedColumns = [...displayedColumns, 'action'];
    } else {
      this.displayedColumns = [
        ...displayedColumns,
        'dateApproval',
        'dateGGApproval',
        'action',
      ];
    }
  }

  fillTableHiiringRequestByProfile() {
    const { userProfile } = getToken();

    if (userProfile == GG) {
      this.setEstadoDefaultGG();
      this.contractImboxService
        .filterHiringRequesBy(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          'Pendiente Aprobacion GG'
        )
        .subscribe((contractImboxList) => {
          console.log("contractImboxList fill", contractImboxList);
          this.dataSource = new MatTableDataSource<IContractImbox>(
            contractImboxList
          );
          this.dataSource.paginator = this.paginator;
        });
    } else {
      this.fillTableHiringRequests();
    }
  }

  private setEstadoDefaultGG() {
    this.formFilter.controls['filterForm'].patchValue({
      cboxClient: '',
      cboxLN: '',
      cboxType: '',
      inputDocNumber: null,
      inputNames: null,
      cboxStatus: 'Pendiente Aprobacion GG',
    });
    this.disableForm$.next(true);
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

  private get userProfile() {
    const { userProfile } = getToken();
    return userProfile;
  }

  ngSubmit() {
    let { cboxClient, cboxLN, cboxType, inputDocNumber, inputNames, cboxStatus } =
      this.formFilter.value.filterForm;
    console.log("this.formFilter.value.filterForm", this.formFilter.value.filterForm);
    const inputNamesTrim = util.trimAllSpaces(inputNames);
    console.log("inputNamesTrim", inputNamesTrim);
    console.log("cboxType", cboxType);

    if (this.userProfile === GG) {
      cboxStatus = 'Pendiente Aprobacion GG';
    }

    this.contractImboxService
      .filterHiringRequesBy(
        cboxClient,
        cboxLN,
        cboxType,
        inputDocNumber,
        inputNamesTrim,
        cboxStatus
      )
      .subscribe({
        next: (contractImboxList) => {
          let data : any = contractImboxList;
          if(data.error) {
            this.notification.toast('error', data.message);
            return;
          }
          if(contractImboxList.length == 0) {
            this.notification.toast('warning', 'No se encontr?? resultados de ' + cboxType);
          } else {
            console.log("contractImboxList", contractImboxList);
            this.dataSource = new MatTableDataSource<IContractImbox>(
              contractImboxList
            );
            this.dataSource.paginator = this.paginator;
          }    
        }, error: (err : Error) => {
          console.log(err);
        }
      });
  }

  onClean() {
    const { userProfile } = getToken();

    if (userProfile === GG) {
      this.formFilter.reset({
        filterForm: {
          cboxClient: '',
          cboxLN: '',
          cboxType: '',
          inputDocNumber: null,
          inputNames: null,
          cboxStatus: 'Pendiente Aprobacion GG',
        },
      });

      return;
    }
    this.formFilter.reset({
      filterForm: {
        cboxClient: '',
        cboxLN: '',
        cboxType: '',
        inputDocNumber: null,
        inputNames: null,
        cboxStatus: '',
      },
    });
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
