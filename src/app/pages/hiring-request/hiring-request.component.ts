import { Component, OnInit } from '@angular/core';
import { setToken } from 'src/app/core/utils/token.storage';

@Component({
  selector: 'app-hiring-request',
  templateUrl: './hiring-request.component.html',
  styleUrls: ['./hiring-request.component.scss'],
})
export class HiringRequestComponent implements OnInit {
  constructor() {
    setToken({ id_sesion: 1 });
  }

  ngOnInit(): void {}
}
