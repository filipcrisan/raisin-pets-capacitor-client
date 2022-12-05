import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LandingPageContainerComponent} from "./containers/landing-page-container/landing-page-container.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageContainerComponent,
  },
  {
    path: '**',
    component: LandingPageContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
