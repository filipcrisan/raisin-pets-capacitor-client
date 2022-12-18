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
    const options: HttpOptions = {
      url: `${this.apiUrl}/login`,
      params: {
        token: `Bearer ${token}`
      }
    };

    return from(CapacitorHttp.put(options).then((httpResponse) => (httpResponse.data as User)));
  }

  logout(): Observable<any> {
    // const options: HttpOptions = {
    //   url: `${this.apiUrl}/logout`
    // };
    //
    // return from(CapacitorHttp.put(options).then((httpResponse) => httpResponse.data));

    return this.http.put<any>(`${this.apiUrl}/logout`, null);
  }

  test(): Observable<any> {
    const options: HttpOptions = {
      url: `${this.apiUrl}/test?token=Bearer`
    };

    return from(CapacitorHttp.get(options));
  }
}
