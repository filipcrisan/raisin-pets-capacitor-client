import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {CapacitorHttp, HttpOptions} from "@capacitor/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthService {
  apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  login(token: string): Observable<User> {
    // we have to use CapacitorHttp as a first anonymous API call, in order to get rid of the Unknown Error
    // subsequent calls can use the Angular's HttpClient normally so that the interceptor works as well
    const options: HttpOptions = {
      url: `${this.apiUrl}/login`,
      params: {
        token: `Bearer ${token}`
      }
    };

    return from(CapacitorHttp.put(options).then((httpResponse) => (httpResponse.data as User)));
  }

  logout(): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/logout`, null);
  }
}
