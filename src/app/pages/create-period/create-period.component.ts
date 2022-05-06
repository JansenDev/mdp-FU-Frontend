import { Component, OnInit } from '@angular/core';
import { ICreatePeriodRequest } from 'src/app/core/models/period.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PeriodsService } from 'src/app/core/services/periods.service';

@Component({
  selector: 'app-create-period',
  templateUrl: './create-period.component.html',
  styleUrls: ['./create-period.component.scss']
})
export class CreatePeriodComponent implements OnInit {
  formData: ICreatePeriodRequest = {
    periodo: '',
    tasa_cambio: null
  }
  periodo_actual = '';
  prox_periodo = '';
  constructor(private periodsService: PeriodsService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getLastPeriod();
  }

  createPeriod(){
    this.periodsService.createPeriod(this.formData)
      .subscribe(createdPeriod => {
        console.log('created period: ', createdPeriod);
        this.notificationService.toast(
          'success',
          'Se creó el periodo con éxito',
          'OK',
          5000
        );
      }, error => {
        console.error(error);
      })
  }

  getLastPeriod(){
    this.periodsService.getLastPeriod()
      .subscribe(lastPeriod => {
        console.log(lastPeriod);
        this.periodo_actual = lastPeriod.periodo;
        console.log('actual: ', this.periodo_actual);
        this.nextPeriod(this.periodo_actual);
        this.formData.periodo = this.prox_periodo;
      }, error => {
        console.error(error);
      })

  }

  nextPeriod(actual: string){
    let separado = actual.split('-');
    let mes = parseInt(separado[0]);
    console.log('mes',mes);
    let year = parseInt(separado[1]);
    console.log('año',year);
    if (mes == 12){
      mes = 1;
      year += 1;
    } else {
      mes+=1;
    }
    let mes_str = ''
    if (mes < 10){
      mes_str = '0' + mes.toString();
    }
    this.prox_periodo = mes_str + '-' + year.toString();
    console.log('prox: ', this.prox_periodo);
  }
}
