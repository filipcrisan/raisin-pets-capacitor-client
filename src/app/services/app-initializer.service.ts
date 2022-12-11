import {Injectable} from '@angular/core';
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  init(): void {
    GoogleAuth.initialize({
      clientId: environment.angularGoogleClientId,
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    })
  }
}
