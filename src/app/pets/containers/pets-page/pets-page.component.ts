import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthFacades} from "../../../facades/auth.facades";

@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html',
  styleUrls: ['./pets-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetsPageComponent {
  constructor(private authFacades: AuthFacades) {
  }

  logout(): void {
    this.authFacades.logout();
  }
}
