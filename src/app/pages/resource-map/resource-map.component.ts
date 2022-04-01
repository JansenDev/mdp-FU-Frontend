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
  ) {
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

  ngSubmit() {
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

  getAllPeriods() {
    this.resourceService.findAllPeriods().subscribe((dataResponse) => {
      this.periodsList = dataResponse;
    });
  }
  getAllPerfiles() {
    this.resourceService.findAllProfiles().subscribe((dataResponse) => {
      this.profileList = dataResponse;
    });
  }

  getAllCollaborator() {
    this.resourceService.findAllCollaborator().subscribe((dataResponse) => {
      this.collaboratorList = dataResponse;
    });
  }

  // getIdCollaboratorFromNameLong(
  //   collaboratorNameLong: string,
  //   collaboratorList: ICollaboratorResponse[]
  // ): number | null {
  //   let collaboradorId = null;

  //   for (let index = 0; index < collaboratorList.length; index++) {
  //     const collaborator = this.collaboratorList[index];

  //     if (
  //       collaboratorNameLong.includes(collaborator.nombres) &&
  //       collaboratorNameLong.includes(collaborator.apellido_pat) &&
  //       collaboratorNameLong.includes(collaborator.apellido_mat)
  //     ) {
  //       collaboradorId = collaborator.cod_colaborador;
  //       break;
  //     }
  //   }

  //   return collaboradorId;
  // }

  findClientByUser() {
    const idUser = 2;

    this.resourceService.findClientByUser(idUser).subscribe((clientsData) => {
      // console.log(clientsData);

      this.clientList = clientsData;
    });
  }
}
