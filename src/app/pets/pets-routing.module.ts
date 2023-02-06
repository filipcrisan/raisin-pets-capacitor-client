import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PetsPageComponent } from './containers/pets-page/pets-page.component';
import { AuthGuard } from '../guards/auth.guard';
import { PetsListContainerComponent } from './containers/pets-list-container/pets-list-container.component';

const routes: Routes = [
  {
    path: '',
    component: PetsPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: PetsListContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
