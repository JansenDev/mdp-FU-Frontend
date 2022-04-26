import { Component, OnInit } from '@angular/core';
import { setToken } from 'src/app/core/utils/token.storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {
    //* ['DELIVERY_MANAGER', 'PROJECT_MANAGER', 'RRHH', 'ANALYST', 'GG']
    setToken({ id_sesion: 40, userProfile: 'GG' });
  }

  ngOnInit(): void {}
}
