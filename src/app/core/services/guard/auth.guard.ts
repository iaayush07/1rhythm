import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) {

  }
  /**
   * @athor samkeet Kevat
   * @description getting user info from Token stored in Local storage
   * @param route
   * @param state
   * @returns TRUE / FALSE
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userData = localStorage.getItem('user')! // storing user data
    if (userData) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }

}
