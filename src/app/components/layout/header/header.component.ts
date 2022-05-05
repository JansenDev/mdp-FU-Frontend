import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  already_logued : boolean = true;
  
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("token"))
      this.already_logued = true;
    else this.already_logued = false;
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("already_logued");
    localStorage.setItem("already_logued", "false");
    this.already_logued = localStorage.getItem("already_logued") == "false";
    location.reload()
  }
}
