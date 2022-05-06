import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.scss'],
})
export class InitPageComponent implements OnInit {
  constructor(private router: Router) {
    this.router.navigate(['home']);
  }

  ngOnInit(): void {}
}
