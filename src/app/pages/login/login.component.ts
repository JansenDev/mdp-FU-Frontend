import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { setToken } from 'src/app/core/utils/token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  resourceForm: FormGroup;
  constructor(
    private service: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.resourceForm = this.formBuilder.group({
      user: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    let user = this.resourceForm.controls['user'].value;
    let password = this.resourceForm.controls['password'].value;
    let input = {
      email: user,
      password: password,
    };
    // console.log('input:', input);
    this.service.login(input).subscribe((data) => {
      setToken(data.token);
      // console.log(data)
      // localStorage.setItem("jwt", data.token);
      // let jwt_decoded : any = jwtDecode(data.token)
      // jwt_decoded = {...jwt_decoded, id_sesion : 40}
      // console.log("jwt_decoded", jwt_decoded);
      // localStorage.setItem("token", JSON.stringify(jwt_decoded));
      // localStorage.setItem("already_logued", "true");
      this.router.navigate(['/']);
    });
  }
}
