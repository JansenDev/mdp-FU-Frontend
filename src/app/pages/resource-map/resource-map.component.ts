import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// models
import { IClientResponse } from 'src/app/core/models/client.model';
import { IPeriodResponse } from 'src/app/core/models/period.model';
import { IProfileResponse } from 'src/app/core/models/profile.model';
import { IResourceResponse } from 'src/app/core/models/resource.model';
import { IProductivityIndicator } from 'src/app/core/models/resource.model';
import { ICollaboratorResponse } from 'src/app/core/models/collaborator.model';
// constants
import { USER_SESION } from 'src/app/core/constants/resource.constants';
import { PRODUCTIVITY_INDICATOR } from 'src/app/core/constants/resource.constants';
// services
import { ResourceService } from '../../core/services/resource.service';
// utils
import { findPeriodActive } from '../../core/utils/utilities.util';
import { getIdCollaboratorFromNameLong } from '../../core/utils/utilities.util';

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
  rowSelected = {};
  resourceForm: FormGroup;
  periodsList: IPeriodResponse[] = [] as IPeriodResponse[];
  profileList: IProfileResponse[] = [];
  collaboratorList: ICollaboratorResponse[] = [];
  clientList: IClientResponse[] = [];
  periodSelect = '';
  productivityIndicator: IProductivityIndicator = PRODUCTIVITY_INDICATOR;

  showDetail = false;
  cod_colaborador: any = null;

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
    this.resourceMapInit();
  }

  resourceMapInit(): void {
    this.onChangeCBoxCollaborator();
    this.fillCBoxPeriod();
    this.fillCBoxProfile();
    this.fillCBoxClient();
  }

  setPeriodActiveToCBoxPeriod(profileList: IPeriodResponse[]) {
    const periodActual = findPeriodActive(profileList);

    if (periodActual != '') {
      this.resourceForm.patchValue({ cboxPeriod: periodActual });
      this.periodSelect = periodActual;
    }
  }

  ngSubmit(): void {
    let { cboxPeriod, cboxClient, cboxProfile, inNames } =
      this.resourceForm.value;

    this.periodSelect = cboxPeriod;
    let idCollaborator = getIdCollaboratorFromNameLong(
      inNames,
      this.collaboratorList
    )!;

    this.findAndsetResourceItems(
      cboxPeriod,
      cboxClient,
      cboxProfile,
      idCollaborator
    );
  }

  onChangeCBoxCollaborator(): void {
    this.resourceForm.controls['cboxClient'].valueChanges.subscribe((value) => {
      this.fillCBoxCollaborator(value);
    });
  }

  onResourceMapDetail(resourceMapItem: IResourceResponse): void {
    this.rowSelected = resourceMapItem;

    console.info(`My Resource Map Item: ${resourceMapItem.nombre_colaborador}`);
    this.cod_colaborador = resourceMapItem.nombre_colaborador;
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
    collaborator?: number
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

  fillCBoxProfile(): void {
    this.resourceService.findAllProfiles().subscribe((profileResponse) => {
      this.profileList = profileResponse;
    });
  }

  fillCBoxCollaborator(idClient: number): void {
    this.resourceService
      .findAllCollaboratorsByClient(idClient)
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
}
