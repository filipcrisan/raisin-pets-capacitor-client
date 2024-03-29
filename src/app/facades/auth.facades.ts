import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers/auth.reducer';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AuthActions } from '../actions';
import { AuthService } from '../services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { authQuery } from '../reducers/auth.selector';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
@Injectable()
export class AuthFacades {
  query = {
    user$: this.store.select(authQuery.getUser),
    userLoading$: this.store.select(authQuery.getUserLoading),
    userError$: this.store.select(authQuery.getUserError),
  };

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login(): void {
    GoogleAuth.signIn()
      .then((googleUser) => {
        if (this.isUserLoggedIn()) {
          this.onGoogleSignInOfLoggedInUser(googleUser.authentication.idToken);
          return;
        }

        this.onGoogleSignIn(googleUser.authentication.idToken);
      })
      .catch(() => {
        this.toastr.error('Google error upon login. Please try again.');
      });
  }

  logout(): void {
    GoogleAuth.signOut()
      .then(() => {
        this.onGoogleSignOut();
      })
      .catch(() => {
        this.toastr.error('Google error upon logout. Please try again.');
      });
  }

  loadUser(): void {
    if (!this.isUserLoggedIn()) {
      return;
    }

    const token = this.getBearerToken();

    this.store.dispatch(AuthActions.loadUser());

    this.authService
      .login(token)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          this.store.dispatch(AuthActions.loadUserSuccess({ user }));
          this.router.navigate(['pets']).then();
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error('Error upon loading user. Please try again.');

          this.store.dispatch(AuthActions.loadUserFailure({ error }));
        },
      });
  }

  isUserLoggedIn(): boolean {
    const token = this.getBearerToken();

    return token != null && !this.isTokenExpired(token);
  }

  getBearerToken(): string {
    return localStorage.getItem('token');
  }

  isTokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  //#region Private methods

  private onGoogleSignIn(token: string): void {
    this.store.dispatch(AuthActions.loadUser());

    this.authService
      .login(token)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          localStorage.setItem('token', token);
          this.store.dispatch(AuthActions.loadUserSuccess({ user }));
          this.router.navigate(['pets']).then();
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error('Error upon authentication. Please try again.');

          this.store.dispatch(AuthActions.loadUserFailure({ error }));
        },
      });
  }

  private onGoogleSignOut(): void {
    this.authService
      .logout()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          localStorage.removeItem('token');
          this.router.navigate(['']).then();
          this.store.dispatch(AuthActions.clearState());
        },
        error: () => {
          localStorage.removeItem('token');
          this.store.dispatch(AuthActions.clearState());

          this.toastr.error('Error upon logout. Please try again.');
        },
      });
  }

  private onGoogleSignInOfLoggedInUser(token: string): void {
    GoogleAuth.signOut()
      .then(() => {
        this.authService
          .logout()
          .pipe(untilDestroyed(this))
          .subscribe({
            next: () => {
              localStorage.removeItem('token');
              this.onGoogleSignIn(token);
            },
            error: () => {
              this.toastr.error('Error upon logout. Please try again.');
            },
          });
      })
      .catch(() => {
        this.toastr.error('Google error upon logout. Please try again.');
      });
  }

  //#endregion
}
