import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { getToken, getTokenBearer } from '../core/utils/token.storage';
import { authorizations } from '../core/constants/profile.authorization';
import { IAuthorizations } from '../core/constants/profile.authorization';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private ar: ActivatedRoute) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isOk = this.verifySesion(route);
    return isOk;
  }

  private verifySesion(route: ActivatedRouteSnapshot): boolean {
    const token = getTokenBearer();
    if (token) {
      const path = route.pathFromRoot.map((v) =>
        v.url.map((segment) => segment.toString()).join('/')
      );
      const ruta = path[path.length - 1];
      const userProfile: keyof IAuthorizations = getToken().userProfile;

      let role = authorizations[userProfile];

      if (role.includes(ruta)) {
        console.log('authorizado');
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }

      return true;
    }
    this.router.navigate(['/', 'login']);
    return false;
  }
}
