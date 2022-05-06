import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { getTokenBearer } from '../core/utils/token.storage';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isOk = this.verifySesion();
    return isOk;
  }

  private verifySesion(): boolean {
    const token = getTokenBearer();
    if (token) {
      return true;
    }
    this.router.navigate(['/', 'login']);
    return false;
  }
}
