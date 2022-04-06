import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// models
import { IClientResponse } from 'src/app/core/models/client.model';
import { IPeriodResponse } from 'src/app/core/models/period.model';
import { IProfileResponse } from 'src/app/core/models/profile.model';
import { IResourceResponse } from 'src/app/core/models/resource.model';
import { IResourceMapFilters } from 'src/app/core/models/resource.model';
import { IProductivityIndicator } from 'src/app/core/models/resource.model';
import { ICollaboratorResponse } from 'src/app/core/models/collaborator.model';
// constants
import { USER_SESION } from 'src/app/core/constants/resource.constants';
import { PRODUCTIVITY_INDICATOR } from 'src/app/core/constants/resource.constants';
// services
import { ResourceService } from '../../core/services/resource.service';
// utils
import { findPeriodActive } from '../../core/utils/utilities.util';

@Component({
  selector: 'app-resource-map',
  templateUrl: './resource-map.component.html',
  styleUrls: ['./resource-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResourceMapComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator = {} as MatPaginator;
  dataSource: MatTableDataSource<IResourceResponse> =
    new MatTableDataSource<IResourceResponse>([]);
  displayedColumns: string[] = [
    'ln',
    'colaborador',
    'estatus',
    'perfil',
    'nivel',
    'f_inicio',
    'f_fin',
    'asignacion',
    'clm_efectivo',
    'produccion',
    'productividad',
  ];
  rowSelected: IResourceResponse = {} as IResourceResponse;
  resourceForm: FormGroup;
  periodsList: IPeriodResponse[] = [] as IPeriodResponse[];
  profileList: IProfileResponse[] = [];
  collaboratorList: ICollaboratorResponse[] = [];
  clientList: IClientResponse[] = [];
  periodSelected = '';
  productivityIndicator: IProductivityIndicator = PRODUCTIVITY_INDICATOR;
  // inputs resource-detail component
  showDetail = false;
  cod_colaborador: any = null;
  cod_mapa_recurso: any = null;
  // inputs summary component
  cod_cliente: number | null = null;
  periodo: string = '';

  constructor(
    private resourceService: ResourceService,
    private formBuilder: FormBuilder
  ) {
    this.resourceForm = this.formBuilder.group({
      cboxPeriod: ['', Validators.required],
      cboxClient: ['', Validators.required],
      cboxProfile: [''],
      inNames: [''],
    });
  }

  ngOnInit(): void {
    this.fillAllCBoxInit();
  }

  fillAllCBoxInit(): void {
    this.fillCBoxProfile();
    this.onChangeCBoxClientFillInputCollaborators();
    this.fillCBoxPeriod();
    this.onChangeCBoxPeriodFillCBoxClient();
  }

  ngSubmit(): void {
    let { cboxPeriod, cboxClient, cboxProfile, inNames }: IResourceMapFilters =
      this.resourceForm.value;

    this.periodSelected = cboxPeriod;
    this.periodo = cboxPeriod;
    this.cod_cliente = parseInt(cboxClient);

    let inputNameWithoutExtraSpaces = inNames
      .split(' ')
      .filter((name: string) => name !== '')
      .join(' ');

    this.findAndsetResourceItems(
      cboxPeriod,
      cboxClient,
      cboxProfile,
      inputNameWithoutExtraSpaces
    );
  }

  onResourceMapDetail(resourceMapItem: IResourceResponse): void {
    this.rowSelected = resourceMapItem;

    this.cod_colaborador = parseInt(resourceMapItem.nombre_colaborador);
    this.cod_mapa_recurso = parseInt(resourceMapItem.cod_mapa_recurso);
    this.showDetail = false;

    // TODO:Implementar mejor solución para el toogle de detalles
    // TODO:Implementar boton ❌'cerrar ' a detalles
    setTimeout(() => {
      this.showDetail = !this.showDetail;
    }, 500);
  }

  findAndsetResourceItems(
    period: string,
    idclient: string,
    idProfile?: string,
    collaborator?: string
  ): void {
    this.resourceService
      .findResourceByPeriodClientProfileNames(
        period,
        idclient,
        idProfile,
        collaborator
      )
      .subscribe((resourceResponse) => {
        this.dataSource = new MatTableDataSource<IResourceResponse>(
          resourceResponse
        );
        this.dataSource.paginator = this.paginator;
      });
  }

  fillCBoxPeriod(): void {
    this.resourceService.findAllPeriods().subscribe((periodResponse) => {
      this.periodsList = periodResponse;
      this.setPeriodActiveToCBoxPeriod(periodResponse);
    });
  }

  setPeriodActiveToCBoxPeriod(profileList: IPeriodResponse[]) {
    const periodActual = findPeriodActive(profileList);

    if (periodActual != '') {
      this.resourceForm.patchValue({ cboxPeriod: periodActual });
      this.periodSelected = periodActual;
    }
  }

  fillCBoxProfile(): void {
    this.resourceService.findAllProfiles().subscribe({
      next: (profileResponse) => {
        this.profileList = profileResponse.sort();
      },
      error: (err) => console.log(err.message),
    });
  }

  fillCBoxCollaborator(idClient: number, period: string): void {
    this.resourceService
      .findCollaboratorsByClientAndPeriod(idClient, period)
      .subscribe((collaboratorResponse) => {
        this.collaboratorList = collaboratorResponse;
      });
  }

  fillCBoxClient(): void {
    const idUser = USER_SESION;

    this.resourceService.findClientByUser(idUser).subscribe((clientsData) => {
      this.clientList = clientsData;
    });
  }

  onChangeCBoxPeriodFillCBoxClient() {
    this.resourceForm.controls['cboxPeriod'].valueChanges.subscribe(
      (periodSelected) => {
        this.fillCBoxClient();
      }
    );
  }

  onChangeCBoxClientFillInputCollaborators(): void {
    this.resourceForm.controls['cboxClient'].valueChanges.subscribe(
      (clientSelected) => {
        const periodSelected = this.resourceForm.controls['cboxPeriod'].value;

        this.fillCBoxCollaborator(clientSelected, periodSelected);
      }
    );
  }
}
