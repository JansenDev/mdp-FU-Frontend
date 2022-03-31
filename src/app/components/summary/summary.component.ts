import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TestService } from '../../core/services/test.service';


// declare var me : any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})

export class SummaryComponent implements OnInit {
  
  public customer: string = "";
  public clm_effective: number = 0;
  public production: number = 0;
  public productivity: number = 0;
  public period: Date = new Date();
  public summary: any = {}; //{"data":{"customer":"Fallo","clm_effective":13.85,"production":99.99,"productivity":9999.99,"period":1648721412}};
  

  constructor(private service: TestService) {
  }
  

  ngOnInit() {
    this.getSummary();
  /*
    this.summary = this.summary.data;

    this.customer = this.summary.customer;
    this.clm_effective = this.summary.clm_effective;
    this.production = this.summary.production;
    this.productivity = this.summary.productivity;
    this.period = this.summary.period;
  */  
  }

  getSummary() {
    this.service.getSummary().subscribe(data => {
      this.summary = data;
      this.customer = data.data.customer;
      this.clm_effective = data.data.clm_effective;
      this.production = data.data.production;
      this.productivity = data.data.productivity;
      this.period = data.data.period;
      console.log("data", data.data)
      // return data;
    }), (err: any) => {
      console.error(err);
    }
  }
}
