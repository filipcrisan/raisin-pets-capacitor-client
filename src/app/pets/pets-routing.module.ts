import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PetsPageComponent } from './containers/pets-page/pets-page.component';
import { AuthGuard } from '../guards/auth.guard';
import { PetsListContainerComponent } from './containers/pets-list-container/pets-list-container.component';
import { AddPetContainerComponent } from './containers/add-pet-container/add-pet-container.component';
import { MenuContainerComponent } from './containers/menu-container/menu-container.component';
import { EditPetContainerComponent } from './containers/edit-pet-container/edit-pet-container.component';
import { TutorialsListContainerComponent } from './containers/tutorials-list-container/tutorials-list-container.component';

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
      {
        path: 'add',
        component: AddPetContainerComponent,
      },
      {
        path: 'edit/:id',
        component: EditPetContainerComponent,
      },
      {
        path: 'tutorials/:id',
        component: TutorialsListContainerComponent,
      },
    ],
  },
  {
    path: 'menu',
    component: MenuContainerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
