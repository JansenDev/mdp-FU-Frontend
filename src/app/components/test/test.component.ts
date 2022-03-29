import { Component, OnInit } from '@angular/core';
import { TestService } from '../../core/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(private servicio: TestService) {}

  ngOnInit(): void {
    this.servicio.findById().subscribe((value) => {
      console.log(value);
    });
  }

  test = 'welcome';
}
