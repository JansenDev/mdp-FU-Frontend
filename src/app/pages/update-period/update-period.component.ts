import { Component, OnInit } from '@angular/core';
import { IGetLastPeriodRequest, IUpdatePeriodRequest } from 'src/app/core/models/period.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PeriodsService } from 'src/app/core/services/periods.service';

@Component({
  selector: 'app-update-period',
  templateUrl: './update-period.component.html',
  styleUrls: ['./update-period.component.scss']
})
export class UpdatePeriodComponent implements OnInit {
  formData: IUpdatePeriodRequest = {
    tasa_cambio: null
  }
  periodo_actual: IGetLastPeriodRequest = {
    periodo: '',
    tasa_cambio: null
  };
  //TODO: Agregar toast de confirmación!

  constructor(private periodsService: PeriodsService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getLastPeriod();
  }

  getLastPeriod(){
    this.periodsService.getLastPeriod()
      .subscribe(lastPeriod => {
        console.log(lastPeriod);
        this.periodo_actual.periodo = lastPeriod.periodo;
        this.periodo_actual.tasa_cambio = lastPeriod.tasa_cambio;
        this.formData.tasa_cambio = this.periodo_actual.tasa_cambio;
        console.log('actual: ', this.periodo_actual);
      }, error => {
        console.error(error);
      })
  }

  updatePeriod(){
    this.periodsService.updatePeriod(this.formData)
      .subscribe(updatedPeriod => {
        console.log('updated: ', updatedPeriod);
        this.notificationService.toast(
          'success',
          'Se actualizó el periodo con éxito',
          'OK',
          5000
        );
      }, error => {
        console.error(error);
      })
  }

}
