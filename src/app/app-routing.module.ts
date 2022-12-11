import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LandingPageContainerComponent} from "./containers/landing-page-container/landing-page-container.component";

const routes: Routes = [
  {
    path: 'pets',
    loadChildren: () => import('./pets/pets.module').then((module) => module.PetsModule),
    title: 'your pets'
  },
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageContainerComponent,
    title: 'raisin\' pets'
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
