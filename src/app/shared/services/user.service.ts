import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  public baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getDataById(id: number): Observable<any> {
    const url = this.baseUrl + "user/users/" + id;
    return this.http.get<any>(url);
  }
}
