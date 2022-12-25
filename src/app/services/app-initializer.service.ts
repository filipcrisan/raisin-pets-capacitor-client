import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { environment } from '../../environments/environment';
import { AuthFacades } from '../facades/auth.facades';

@Injectable()
export class AppInitializerService {
  constructor(private authFacades: AuthFacades) {}

  init(): void {
    GoogleAuth.initialize({
      clientId: environment.angularGoogleClientId,
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });

    if (!this.authFacades.isUserLoggedIn()) {
      return;
    }

    this.authFacades.loadUser();
  }
}
