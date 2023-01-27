import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { studio } from '../studio.model';

@Injectable()
export class StudioService {

  public baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  /** 
     * @author : Charvi Sarang
     * Get Service of studio 
     */
  getStudioData(): Observable<studio[]> {
    const url = this.baseUrl + "studio/allstudios";
    return this.http.get<studio[]>(url);
  }
}
