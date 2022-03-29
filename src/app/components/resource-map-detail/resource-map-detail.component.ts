import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-resource-map-detail',
  templateUrl: './resource-map-detail.component.html',
  styleUrls: ['./resource-map-detail.component.scss']
})
export class ResourceMapDetailComponent implements OnInit {

  constructor() { }
  showDetail = false;
  currentTab = 0;

  ngOnInit(): void {
    console.log(this.currentTab);
  }

  toggleDetail(){
    this.showDetail = !this.showDetail;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    //console.log('index = ', tabChangeEvent.index);
    this.currentTab = tabChangeEvent.index;
    console.log(this.currentTab);
  }

}
