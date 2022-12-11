import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {State} from "../reducers/auth.reducer";
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";
import {AuthActions} from "../actions";
import {AuthService} from "../services/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {HttpErrorResponse} from "@angular/common/http";

@UntilDestroy()
@Injectable()
export class AuthFacades {
  constructor(
    private store: Store<State>,
    private authService: AuthService
  ) {
  }

  login(): void {
    GoogleAuth.signIn()
      .then((googleUser) => {
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

  //#region Private methods

  private onGoogleSignIn(token: string): void {
    this.authService.login(token)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          localStorage.setItem('token', token);
          this.store.dispatch(AuthActions.loadUserSuccess({user}));
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
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }

  //#endregion
}
