import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist } from '../model/artist.model';
import { ArtistType } from '../model/artistTypes.model';
import { PerformanceType } from '../model/performanceTypes.model';

@Injectable()
export class ManageArtistProfileService {
  public baseUrl: string;
  constructor(private httpServices: HttpClient) {
    this.baseUrl = environment.baseUrl
  }

  /**
   *add user to database
   * @param data
   * @returns
   */
  postRegistrationForm(data: any): Observable<any> {

    const url = this.baseUrl + 'artist/addArtist'
    return this.httpServices.post<any>(url, data)
  }
  /**
   * Get artistType
   * @returns
   */
  getartistType(): Observable<any> {
    const url = this.baseUrl + 'artistType/artistTypes'
    return this.httpServices.get<ArtistType[]>(url)
  }
  /**
   * Get perfomanceType
   * @returns
   */
  perfomanceType(): Observable<any> {
    const url = this.baseUrl + 'artist/performanceTypes'
    return this.httpServices.get<PerformanceType[]>(url)
  }
}
