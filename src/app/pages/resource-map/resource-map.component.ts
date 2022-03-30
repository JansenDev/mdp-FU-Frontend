import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  name1: string;
  position1: number;
  weight1: number;
  symbol1: string;
  name2: string;
  position2: number;
  weight2: number;
  symbol2: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
  },
  {
    position: 2,
    name: 'Hydrogen1',
    weight: 2.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
  },
  {
    position: 3,
    name: 'Hydrogen3',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
  },
  {
    position: 4,
    name: 'Hydrogen4',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
  },
  {
    position: 4,
    name: 'Hydrogen5',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
  },
  {
    position: 4,
    name: 'Hydrogen6',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
  },
  {
    position: 4,
    name: 'Hydrogen7',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
  },
  {
    position: 4,
    name: 'Hydrogen8',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
  },
  {
    position: 4,
    name: 'Hydrogen9',
    weight: 1.0079,
    symbol: 'H',
    position1: 1,
    name1: 'Hydrogen',
    weight1: 1.0079,
    symbol1: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
  },
];

@Component({
  selector: 'app-resource-map',
  templateUrl: './resource-map.component.html',
  styleUrls: ['./resource-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResourceMapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  activeRow = {};
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

  @ViewChild(MatPaginator)
  paginator: MatPaginator = {} as MatPaginator;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
