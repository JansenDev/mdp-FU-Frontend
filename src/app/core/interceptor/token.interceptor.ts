import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getToken } from '../utils/token.storage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addAuthorization(request);

    return next.handle(request);
  }

  private addAuthorization(request: HttpRequest<unknown>) {
    const token = getToken();

    if (token) {
      const auth = request.clone({
        headers: request.headers
          .append('Authorization', token)
          .append('enctype', 'multipart/form-data')

          // .append('encType', 'multipart/form-data'),
        // .set('Content-Type', 'multipart/form-data'),
      });

      return auth;
    }

    return request;
  }
}
