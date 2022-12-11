import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {State} from "../reducers/auth.reducer";
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";
import {AuthActions} from "../actions";
import {AuthService} from "../services/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@UntilDestroy()
@Injectable()
export class AuthFacades {
  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private router: Router
  ) {
  }

  login(): void {
    GoogleAuth.signIn()
      .then((googleUser) => {
        if (this.isUserLoggedIn()) {
          this.onGoogleSignInOfLoggedInUser(googleUser.authentication.idToken);
          return;
        }

        this.onGoogleSignIn(googleUser.authentication.idToken);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout(): void {
    GoogleAuth.signOut()
      .then(() => {
        this.onGoogleSignOut();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadUser(): void {
    if (!this.isUserLoggedIn()) {
      return;
    }

    const token = this.getBearerToken();

    this.authService.login(token)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          this.store.dispatch(AuthActions.loadUserSuccess({user}));
        },
        error: (error: HttpErrorResponse) => {
          this.store.dispatch(AuthActions.loadUserFailure({error}));
        }
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
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  //#region Private methods

  private onGoogleSignIn(token: string): void {
    this.authService.login(token)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          localStorage.setItem('token', token);
          this.store.dispatch(AuthActions.loadUserSuccess({user}));
          this.router.navigate(['pets']).then();
        },
        error: (error: HttpErrorResponse) => {
          this.store.dispatch(AuthActions.loadUserFailure({error}));
        }
      });
  }

  private onGoogleSignOut(): void {
    this.authService.logout()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          localStorage.removeItem('token');
          this.router.navigate(['']).then();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }

  private onGoogleSignInOfLoggedInUser(token: string): void {
    GoogleAuth.signOut()
      .then(() => {
        this.authService.logout()
          .pipe(untilDestroyed(this))
          .subscribe({
            next: () => {
              localStorage.removeItem('token');
              this.onGoogleSignIn(token);
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //#endregion
}
