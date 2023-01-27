import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { userLogin } from 'src/app/user/login/userLogin.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthService {

  public loginURL = environment.baseUrl + 'user/login';
  public refreshTokenURL = environment.baseUrl + 'user/refresh';
  constructor(private http: HttpClient,
    private router: Router,) { }

  /**
    * Function for login POST API
    * @author Almira Shaikh
    * @description post method for login form
    * @param user
    */

  login(user: userLogin): Observable<any> {
    return this.http.post<any>(this.loginURL, user);
  }

  /**
    * Function for logout
    * @author Almira shaikh
    * @description logout service
    */
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

  /**
   * @author Jinal Tandel
   * @description service for refresh token
   * @param userToken 
   * @returns refreshToken
   */
  refreshToken(userToken: string): Observable<string> {
    return this.http.post<string>(this.refreshTokenURL, userToken);
  }
}
