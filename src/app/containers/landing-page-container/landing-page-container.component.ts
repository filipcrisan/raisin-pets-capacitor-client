import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-landing-page-container',
  templateUrl: './landing-page-container.component.html',
  styleUrls: ['./landing-page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageContainerComponent implements OnInit {
  constructor(private authService: SocialAuthService) {
  }

  ngOnInit(): void {
    // do this in the app initializer, and update redux with the user
    // the guard will check in redux
    // upon logout, erase from redux
    this.authService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
      console.log(user);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
