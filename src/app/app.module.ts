import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageContainerComponent } from './containers/landing-page-container/landing-page-container.component';
import { AppInitializerService } from './services/app-initializer.service';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCERS } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthFacades } from './facades/auth.facades';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ToastrModule } from 'ngx-toastr';

export function initializeApp(appInitializerService: AppInitializerService) {
  return () => appInitializerService.init();
}

const FACADES = [AuthFacades];

const SERVICES = [AppInitializerService, AuthService, AuthGuard];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageContainerComponent,
    LandingPageComponent,
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
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx raisin pets',
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    SharedModule.forRoot(),
  ],
  providers: [
    FACADES,
    SERVICES,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializerService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
