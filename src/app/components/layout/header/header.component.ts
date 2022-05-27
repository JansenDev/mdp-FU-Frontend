import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  already_logued : boolean = true;
  name: string = "";

  constructor() { }

  ngOnInit(): void {
    // if(localStorage.getItem("jwt"))
    //   this.already_logued = true;
    // else this.already_logued = false;
    let jwt = localStorage.getItem("jwt_decoded") + "" ;
    let obj = JSON.parse(jwt);
    this.name = obj.nombre;
  }
  logout() {
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    localStorage.removeItem("jwt");
    localStorage.removeItem("jwt_decoded");
    // localStorage.removeItem("already_logued");
    // localStorage.setItem("already_logued", "false");
    // this.already_logued = localStorage.getItem("already_logued") == "false";
    // location.reload()
  }
}
