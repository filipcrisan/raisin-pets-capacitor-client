import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";

@Component({
  selector: 'app-landing-page-container',
  templateUrl: './landing-page-container.component.html',
  styleUrls: ['./landing-page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageContainerComponent {
  googleUser: any;

  async signInWithGoogle() {
    this.googleUser = await GoogleAuth.signIn();
  }
}
