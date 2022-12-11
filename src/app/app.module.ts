import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {LandingPageContainerComponent} from './containers/landing-page-container/landing-page-container.component';
import {AppInitializerService} from "./services/app-initializer.service";

export function initializeApp(appInitializerService: AppInitializerService) {
  return () => appInitializerService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageContainerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterOutlet,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializerService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
