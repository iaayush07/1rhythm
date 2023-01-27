import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City, Country, State, UserType } from 'src/app/shared/model/location.model';
import { userRegistration } from 'src/app/user/registration/userRegistration.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class RegistrationService {
  public baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl
  }
  /**
   *add user to database
   * @param data
   * @returns
   */
  postRegistrationForm(data: userRegistration): Observable<userRegistration> {
    const url = this.baseUrl + 'user'
    return this.http.post<userRegistration>(url, data)
  }
  /**
    * Get userType
    * @returns
    */
  getUserType(): Observable<UserType[]> {
    const url = this.baseUrl + 'user/userTypes'
    return this.http.get<UserType[]>(url)
  }
  /**
   * Get countries
   * @returns
   */
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}location/countries`)
  }
  /**
   * Get States
   * @returns
   */
  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${this.baseUrl}location/states`)
  }
  /**
   * Get cities
   * @returns
   */
  getCity(): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}location/cities`)
  }
}
