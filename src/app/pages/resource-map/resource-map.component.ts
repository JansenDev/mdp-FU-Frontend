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
import { ResourceMapDetailComponent } from 'src/app/components/resource-map-detail/resource-map-detail.component';
import { SummaryComponent } from 'src/app/components/summary/summary.component';

@Component({
  selector: 'app-resource-map',
  templateUrl: './resource-map.component.html',
  styleUrls: ['./resource-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResourceMapComponent implements OnInit {
  @ViewChild(ResourceMapDetailComponent, {static: false}) //permite llamar a los métodos del componente hijo desde este padre
  private resourceDetailComponent!: ResourceMapDetailComponent;
  @ViewChild(MatPaginator)
  paginator: MatPaginator = {} as MatPaginator;
  dataSource: MatTableDataSource<IResourceResponse> =
    new MatTableDataSource<IResourceResponse>([]);

  @ViewChild(SummaryComponent, {static: false}) summary !: SummaryComponent;

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
  // filterSelects: IResourceMapFilters = {} as IResourceMapFilters;
  nameClient: any = '';
  periodoToSummary: any = null;
  namePerfil: any = null;
  idClient: any = null;

  // TEMPORAL SESION
  inputIdSesion: any = null;
  cod_cliente: number = 0;
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
      inputIdUser: ['1'],
    });
  }

  ngOnInit(): void {
    this.fillAllCBoxInit();
    // TEMPORAL
    this.onSesionTemp();
  }
  // TEMPORAL
  onSesionTemp() {
    this.resourceForm.controls['inputIdUser'].valueChanges.subscribe(
      (id_sesion) => {
        this.inputIdSesion = parseInt(id_sesion);
        this.fillCBoxClient();
      }
    );
  }

  fillAllCBoxInit(): void {
    this.fillCBoxProfile();
    this.onChangeCBoxClientFillInputCollaborators();
    this.fillCBoxPeriod();
    this.onChangeCBoxPeriodFillCBoxClient();
  }

  ngSubmit(): void {
    let {
      cboxPeriod,
      cboxClient,
      cboxProfile,
      inNames,
      inputIdUser,
    }: IResourceMapFilters = this.resourceForm.value;

    this.periodSelected = cboxPeriod;

    let clientfound = this.clientList.filter(
      (client) => client.cod_cliente == parseInt(cboxClient)
    );

    this.nameClient = clientfound[0].nombre_corto;

    this.periodoToSummary=cboxPeriod
    this.idClient = cboxClient
    this.namePerfil = cboxProfile

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

    this.showSummary();
  }

  onResourceMapDetail(resourceMapItem: IResourceResponse): void {
    this.rowSelected = resourceMapItem;
    this.cod_colaborador = parseInt(resourceMapItem.cod_colaborador);
    this.cod_mapa_recurso = parseInt(resourceMapItem.cod_mapa_recurso);
    this.resourceDetailComponent.loadProductivity(this.cod_mapa_recurso);
    this.resourceDetailComponent.loadContract(this.cod_colaborador, this.periodo);
    this.resourceDetailComponent.loadAssignments(this.cod_colaborador, this.periodo, this.cod_cliente);
    console.log("cod cliente: ",this.cod_cliente)

    if (this.showDetail){
      this.showDetail = false;
    } else {
      this.showDetail = true;
    }
    console.log(this.showDetail);
  }

  onClose(){
    this.showDetail = false;
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
        if(resourceResponse.length == 0) this.summary.show = false;
        else this.summary.show = true;
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
        console.log("collaboratorList", this.collaboratorList);
      });
  }

  fillCBoxClient(): void {
    // TEMPORAL
    const idUser = this.inputIdSesion || this.resourceForm.value.inputIdUser;

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

  showSummary() {
    console.log("muestrame summary: ",this.summary);
    console.log("parametros", this.nameClient, this.periodoToSummary, this.namePerfil, this.idClient, this.cod_colaborador);
    this.summary.getSummary(this.nameClient, this.periodoToSummary, this.namePerfil, this.idClient, this.cod_colaborador);
  }
}
