import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthFacades} from "../facades/auth.facades";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authFacades: AuthFacades,
    private router: Router
  ) {
  }

  canActivate(): boolean {
    if (!this.authFacades.isUserLoggedIn()) {
      this.router.navigate(['']).then();
      return false;
    }

    return true;
  }
}
