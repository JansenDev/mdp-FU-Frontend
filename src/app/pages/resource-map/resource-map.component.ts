import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { productivityIndicator } from 'src/app/core/constants/resource.constants';
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
  rowSelected = {};
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
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  dataSource: MatTableDataSource<IResourceResponse> =
    new MatTableDataSource<IResourceResponse>([]);

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
    // add default values
    // this.resourceForm.patchValue({
    //   cboxProfile: '',
    // });
  }

  ngOnInit(): void {
    this.getResourceByPeriodClientProfileNames(2, '2022-02', '12');
    this.resourceInit();
  }

  resourceInit() {
    this.getAllPeriods();
    this.getAllPerfiles();
    this.getAllCollaborator();
    this.findClientByUser();
  }

  onResourceMapDetail(resourceMapItem: IResourceResponse) {
    this.rowSelected = resourceMapItem;

    console.log(`ResourceMapItem: ${resourceMapItem.cod_colaborador}`);
    this.cod_colaborador = resourceMapItem.cod_colaborador;
    this.showDetail = false;

    // TODO:Implementar mejor solución para el toogle de detalles
    // TODO:Implementar boton ❌'cerrar ' a detalles
    setTimeout(() => {
      this.showDetail = !this.showDetail;
    }, 500);
  }

  getResourceByPeriodClientProfileNames(
    idUser: number,
    period: string,
    idclient: string,
    idProfile?: string,
    collaborator?: number
  ): void {
    this.resourceService
      .findResourceByPeriodClientProfileNames(
        idUser,
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

  ngSubmit(): void {
    const idUser = 2;
    let { cboxPeriod, cboxClient, cboxProfile, inNames } =
      this.resourceForm.value;

    this.periodTitle = cboxPeriod;
    let idCollaborator = getIdCollaboratorFromNameLong(
      inNames,
      this.collaboratorList
    )!;

    this.getResourceByPeriodClientProfileNames(
      idUser,
      cboxPeriod,
      cboxClient,
      cboxProfile,
      idCollaborator
    );
  }

  getAllPeriods(): void {
    this.resourceService.findAllPeriods().subscribe((periodResponse) => {
      this.periodsList = periodResponse;
    });
  }

  getAllPerfiles(): void {
    this.resourceService.findAllProfiles().subscribe((profileResponse) => {
      this.profileList = profileResponse;
    });
  }

  getAllCollaborator(): void {
    this.resourceService
      .findAllCollaborator()
      .subscribe((collaboratorResponse) => {
        this.collaboratorList = collaboratorResponse;
      });
  }

  findClientByUser(): void {
    const idUser = 2;

    this.resourceService.findClientByUser(idUser).subscribe((clientsData) => {
      this.clientList = clientsData;
    });
  }
}
