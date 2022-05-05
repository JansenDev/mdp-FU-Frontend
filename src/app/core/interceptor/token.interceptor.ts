import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getToken } from '../utils/token.storage';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router : Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addAuthorization(request);

    return next.handle(request);
  }

  private addAuthorization(request: HttpRequest<unknown>) {
    const token = getToken();
    let jwt = localStorage.getItem("jwt")
    if (jwt) {
      const auth = request.clone({
        headers: request.headers
          .set('Authorization', 'Bearer ' + jwt)
          .set('Content-Type', 'application/json'),
      });
      let decoded : any = jwt_decode(jwt)
      if(decoded) {
        localStorage.setItem("userProfile", decoded.userProfile)
        localStorage.setItem("id_sesion", decoded.userProfile)
      }
      return auth;
    }
    this.router.navigate(['/']);
    return request;
  }
}
