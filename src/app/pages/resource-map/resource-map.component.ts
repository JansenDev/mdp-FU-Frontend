import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IResourceResponse } from 'src/app/core/models/resource.model';
import { ResourceService } from '../../core/services/resource.service';

@Component({
  selector: 'app-resource-map',
  templateUrl: './resource-map.component.html',
  styleUrls: ['./resource-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResourceMapComponent implements OnInit {
  constructor(
    private resourceService: ResourceService,
    private formBuilder: FormBuilder
  ) {
    this.resourceForm = this.formBuilder.group({
      cboxPeriodo: [],
    });
  }

  ngOnInit(): void {
    this.getResourceByPeriodClientProfileNames(
      2,
      '2022-02',
      'Industrias Stark'
    );
  }
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

  getResourceByPeriodClientProfileNames(
    idUser: number,
    period: string,
    client: string,
    profile?: string,
    names?: string
  ) {
    this.resourceService
      .findResourceByPeriodClientProfileNames(
        idUser,
        period,
        client,
        profile,
        names
      )
      .subscribe((resourceResponse) => {
        console.log(resourceResponse);
        this.dataSource = new MatTableDataSource<IResourceResponse>(
          resourceResponse
        );
        this.dataSource.paginator = this.paginator;
      });
  }

  ngSubmit() {
    console.log('Submit');
  }
}
