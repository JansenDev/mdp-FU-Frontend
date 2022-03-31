import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

export interface AssignedService {
    type: string,
    name: string,
    percentage: number,
    start: Date,
    end: Date
}

@Component({
  selector: 'app-resource-map-detail',
  templateUrl: './resource-map-detail.component.html',
  styleUrls: ['./resource-map-detail.component.scss']
})
export class ResourceMapDetailComponent implements OnInit {

  constructor() { }
  showDetail = true;
  currentTab = 0;
  tableData: AssignedService[] = [
    {
      type: 'PRY',
      name: 'Proyecto1',
      percentage: 50,
      start: new Date('03-14'),
      end: new Date('05-16')
    },
    {
      type: 'RQ',
      name: 'Requerimiento3',
      percentage: 50,
      start: new Date('03-30'),
      end: new Date('05-10')
    }
  ]
  columnsToDisplay = ['service', 'name', 'percentage', 'start', 'end'];

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
