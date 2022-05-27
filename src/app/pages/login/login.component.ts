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
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  resourceForm: FormGroup;
  isValidEmail : boolean = true;
  constructor(
    private service: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NotificationService,
  ) {
    this.resourceForm = this.formBuilder.group({
      user: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.resourceForm.controls['user'].valueChanges.subscribe(data => {
      if(data.includes("@mdp.com.pe"))
        this.isValidEmail = true;
      else this.isValidEmail = false;
    })
  }

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
      let jwt_decoded : any = jwtDecode(data.token)
      localStorage.setItem("jwt", data.token);      
      localStorage.setItem("jwt_decoded", JSON.stringify(jwt_decoded));
      this.router.navigate(['/home']);
    }
    , error => {
      this.notification.toast('error', "Usuario o contraseña incorrecta", 'ERROR');
    });
  }
}
