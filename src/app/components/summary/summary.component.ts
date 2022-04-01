import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SummaryService } from '../../core/services/summary.service';
import { ISummaryResponse } from '../../core/models/summary.model';

// declare var me : any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})

export class SummaryComponent implements OnInit {
  private summary: ISummaryResponse = {"customer":"Fallo","clm_effective": 0,"production": 0,"productivity": 0,"period": new Date(1648721412)};
  public customer: string = "";
  public clm_effective: number = 0;
  public production: number = 0;
  public productivity: number = 0;
  public period: Date = new Date();
  // public summary: any = {}; //{"data":{"customer":"Fallo","clm_effective":13.85,"production":99.99,"productivity":9999.99,"period":1648721412}};
  

  constructor(private service: SummaryService) {
  }
  

  ngOnInit() {
    this.getSummary();
  }

  getSummary() {
    this.service.getSummary().subscribe(data => {
      this.summary = data;
      this.customer = data.customer;
      this.clm_effective = data.clm_effective;
      this.production = data.production;
      this.productivity = data.productivity;
      this.period = data.period;
    }), (err: any) => {
      console.error(err);
    }
  }
}
