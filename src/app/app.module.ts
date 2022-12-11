import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {LandingPageContainerComponent} from './containers/landing-page-container/landing-page-container.component';
import {AppInitializerService} from "./services/app-initializer.service";
import {StoreModule} from "@ngrx/store";
import {metaReducers, ROOT_REDUCERS} from "./reducers";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {AuthFacades} from "./facades/auth.facades";
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";

export function initializeApp(appInitializerService: AppInitializerService) {
  return () => appInitializerService.init();
}

const FACADES = [
  AuthFacades
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageContainerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx raisin pets',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    FACADES,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializerService],
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
