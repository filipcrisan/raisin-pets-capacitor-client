import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {
  apiUrl = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {
  }

  login(token: string): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/login?token=Bearer ${token}`, null);
  }

  logout(): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/logout`, null);
  }
}
