import { Component, OnInit } from '@angular/core';
import { IPeriodResponse } from 'src/app/core/models/period.model';
import { PeriodsService } from 'src/app/core/services/periods.service';

@Component({
  selector: 'app-period-administration',
  templateUrl: './period-administration.component.html',
  styleUrls: ['./period-administration.component.scss']
})
export class PeriodAdministrationComponent implements OnInit {

  constructor(private periodService: PeriodsService) { }
  last_period: IPeriodResponse = {
    periodo: '',
    tasa_cambio: 0,
    fecha_apertura: new Date(0),
    estado: ''
  }
  periods: IPeriodResponse[] = [];
  columnsToDisplay = ['period', 'rate', 'open-date', 'status'];

  ngOnInit(): void {
    this.loadPeriods();
  }

  loadPeriods(){
    this.periodService.getAllPeriods()
      .subscribe(fetchedPeriods => {
        console.log('fetched periods: ', fetchedPeriods);
        this.periods = fetchedPeriods;
      })
  }

}
