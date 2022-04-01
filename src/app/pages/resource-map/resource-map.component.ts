import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  productivityIndicator,
  USER_SESION,
} from 'src/app/core/constants/resource.constants';
import { IClientResponse } from 'src/app/core/models/client.model';
import { ICollaboratorResponse } from 'src/app/core/models/collaborator.model';
import { IPeriodResponse } from 'src/app/core/models/period.model';
import { IProfileResponse } from 'src/app/core/models/profile.model';
import {
  IProductivityIndicator,
  IResourceResponse,
} from 'src/app/core/models/resource.model';
import { ResourceService } from '../../core/services/resource.service';
import { getIdCollaboratorFromNameLong } from '../../core/utils/utilities.util';

@Component({
  selector: 'app-resource-map',
  templateUrl: './resource-map.component.html',
  styleUrls: ['./resource-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResourceMapComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
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
  periodTitle = '';
  productivityIndicator: IProductivityIndicator = productivityIndicator;

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
    // this.getResourceByPeriodClientProfileNames('2022-03', '1');
    this.resourceMapInit();
  }

  resourceMapInit(): void {
    this.onChangeCollaborator();
    this.getAllPeriods();
    this.getAllPerfiles();
    this.getClientByUser();

    this.resourceForm.patchValue({
      cboxPeriod: '2022-02',
    });

    // this.cboxDefaultValue(cboxPeriod, '2022-02');
  }

  // cboxDefaultValue(cboxName: any, value: string) {
  //   this.resourceForm.patchValue({
  //     cboxPeriod: value,
  //   });
  // }

  onChangeCollaborator(): void {
    this.resourceForm.controls['cboxClient'].valueChanges.subscribe((value) => {
      console.log(value);
      this.getAllCollaborators(value);
    });
  }

  onResourceMapDetail(resourceMapItem: IResourceResponse): void {
    this.rowSelected = resourceMapItem;

    console.log(`ResourceMapItem: ${resourceMapItem.nombre_colaborador}`);
    this.cod_colaborador = resourceMapItem.nombre_colaborador;
    this.showDetail = false;

    // TODO:Implementar mejor solución para el toogle de detalles
    // TODO:Implementar boton ❌'cerrar ' a detalles
    setTimeout(() => {
      this.showDetail = !this.showDetail;
    }, 500);
  }

  ngSubmit(): void {
    let { cboxPeriod, cboxClient, cboxProfile, inNames } =
      this.resourceForm.value;

    this.periodTitle = cboxPeriod;
    let idCollaborator = getIdCollaboratorFromNameLong(
      inNames,
      this.collaboratorList
    )!;

    this.getResourceByPeriodClientProfileNames(
      cboxPeriod,
      cboxClient,
      cboxProfile,
      idCollaborator
    );
  }

  getResourceByPeriodClientProfileNames(
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

  getAllPeriods(): void {
    this.resourceService.findAllPeriods().subscribe((periodResponse) => {
      this.periodsList = periodResponse;
      // console.log(periodResponse);
    });
  }

  getAllPerfiles(): void {
    this.resourceService.findAllProfiles().subscribe((profileResponse) => {
      this.profileList = profileResponse;
    });
  }

  getAllCollaborators(idClient: number): void {
    // const client = USER_SESION;
    this.resourceService
      .findAllCollaboratorsByClient(idClient)
      .subscribe((collaboratorResponse) => {
        this.collaboratorList = collaboratorResponse;
      });
  }

  getClientByUser(): void {
    const idUser = USER_SESION;

    this.resourceService.findClientByUser(idUser).subscribe((clientsData) => {
      this.clientList = clientsData;
    });
  }
}
