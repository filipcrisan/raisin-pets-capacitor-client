import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PetsPageComponent } from './containers/pets-page/pets-page.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: PetsPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
