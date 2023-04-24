import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthFacades } from '../facades/auth.facades';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService {
  constructor(private authFacades: AuthFacades, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method == 'JSONP') {
      return next.handle(req);
    }

    const token = this.authFacades.getBearerToken();

    if (token == null) {
      return next.handle(req);
    }

    if (this.authFacades.isTokenExpired(token)) {
      this.router.navigate(['']).then();
      return next.handle(req);
    }

    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(authRequest);
  }
}
