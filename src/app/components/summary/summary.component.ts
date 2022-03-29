import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  
  public customer: string;
  public clm_effective: number;
  public production: number;
  public productivity: number;
  public period: Date;

  constructor() {
    this.customer = "Mi Banco";
    this.clm_effective = 0;
    this.production = 0;
    this.productivity = 0;
    this.period = new Date(); 
  }

  ngOnInit(): void {
  }

}
