import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPeriodResponse } from 'src/app/core/models/period.model';
import { PeriodsService } from 'src/app/core/services/periods.service';

@Component({
  selector: 'app-period-administration',
  templateUrl: './period-administration.component.html',
  styleUrls: ['./period-administration.component.scss']
})
export class PeriodAdministrationComponent implements OnInit, AfterViewInit {

  constructor(private periodsService: PeriodsService) { }

  last_period: IPeriodResponse = {
    periodo: '',
    tasa_cambio: 0,
    fecha_apertura: new Date(0),
    estado: ''
  }
  periods: IPeriodResponse[] = [];
  dataSource: MatTableDataSource<IPeriodResponse> = new MatTableDataSource<IPeriodResponse>();
  @ViewChild(MatPaginator)
  paginator: MatPaginator = {} as MatPaginator;;

  columnsToDisplay = ['period', 'rate', 'open-date', 'status', 'indicator'];

  ngOnInit(): void {
    this.loadPeriods();
  }

  ngAfterViewInit(): void {

  }

  loadPeriods(){
    this.periodsService.getAllPeriods()
      .subscribe(fetchedPeriods => {
        console.log('fetched periods: ', fetchedPeriods);
        this.periods = fetchedPeriods;
        this.dataSource = new MatTableDataSource<IPeriodResponse>(this.periods);
        this.dataSource.paginator = this.paginator;
      })
  }

}
