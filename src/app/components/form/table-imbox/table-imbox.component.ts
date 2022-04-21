import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-imbox',
  templateUrl: './table-imbox.component.html',
  styleUrls: ['./table-imbox.component.scss'],
})
export class TableImboxComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() dataSource: any = [];
  // @Input() displayedColumns: string[] = [];
  @Input() displayedColumns: any = [];
}
