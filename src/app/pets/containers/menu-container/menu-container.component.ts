import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFacades } from '../../../facades/auth.facades';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContainerComponent {
  authQuery = this.authFacades.query;

  constructor(private authFacades: AuthFacades, private location: Location) {}

  onClose(): void {
    this.location.back();
  }

  onLogout(): void {
    this.authFacades.logout();
  }
}
