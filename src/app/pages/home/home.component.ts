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
    // let user_profile = localStorage.getItem("user");
    // if(user_profile != null) 
    //   user_profile = JSON.parse(user_profile);
    // setToken({id_sesion: 40, "userProfile": user_profile})
    // setToken({user_profile})
    // setToken({ id_sesion: 40, userProfile: 'RRHH' });
  }

  ngOnInit(): void {}
}
