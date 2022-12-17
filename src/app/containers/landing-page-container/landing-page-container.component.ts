import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthFacades} from "../../facades/auth.facades";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-landing-page-container',
  templateUrl: './landing-page-container.component.html',
  styleUrls: ['./landing-page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageContainerComponent {
  response: any;

  constructor(private authFacades: AuthFacades, private authService: AuthService) {
  }

  signInWithGoogle(): void {
    this.authFacades.login();
  }

  test(): void {
    this.authService.test().subscribe((x) => {
      this.response = x;
    });
  }
}
