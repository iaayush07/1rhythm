import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { ToastrMessageService } from 'src/app/shared/services/toastr_message.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public message: string;
  public i: number;
  constructor(private loaderService: LoaderService, private toastrService: ToastrMessageService, private authService: AuthService) {
    this.message = '';
    this.i = 0;
  }

  /**
   * @author Jinal Tandel
   * @param request
   * @param next
   * @returns request
   */

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.i++;
    this.loaderService.showLoader(true);
    const todaydate = Date.now() / 1000;
    localStorage.setItem('currentTime', todaydate.toString())

    // add authorization header with basic auth credentials if available
    let currentUserToken = localStorage.getItem('user')!;
    let expirationTime = +localStorage.getItem('expirationTime')!;

    //condition for refresh token
    if (todaydate > expirationTime) {
      this.authService.refreshToken(currentUserToken);
    }

    //condition for set basic token in header
    if (!req.url.endsWith('login' || 'user' || 'refresh')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserToken}`,
        }
      });
    }
    return Observable.create((observer: any) => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              observer.next(event);
            }
          },
          err => {
            console.log("err", err);

            if (err.status) {
              console.log(err);
              switch (err.status) {
                case 400:
                  this.message = err?.error?.message;
                  this.toastrService.onError(this.message)
                  break;
                case 401:
                  this.message = err?.error?.message;
                  this.toastrService.onError(this.message)
                  this.loaderService.showLoader(false)
                  break;
                case 404:
                  this.message = err?.message;
                  this.toastrService.onError(this.message)
                  break;
                case 500:
                  this.message = err?.error?.message;
                  this.toastrService.onError(this.message)
                  break;
                default:
                  this.message = err?.error?.message;
                  this.toastrService.onError(this.message)
                  break;
              }
            }
            this.i = 0;
            observer.error(err);
          },
          () => {
            this.i--;
            observer.complete();
          });
      return () => {
        subscription.unsubscribe();
        if (this.i <= 0) {
          this.loaderService.showLoader(false)
        }
      };
    });
  }

}
