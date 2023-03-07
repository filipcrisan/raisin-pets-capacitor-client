import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsPageComponent } from './containers/pets-page/pets-page.component';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsListComponent } from './components/pets-list/pets-list.component';
import { PetsListContainerComponent } from './containers/pets-list-container/pets-list-container.component';
import { PetsService } from './services/pets.service';
import { PetsFacades } from './facades/pets.facades';
import { featureKey, reducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { AddPetContainerComponent } from './containers/add-pet-container/add-pet-container.component';
import { AddPetComponent } from './components/add-pet/add-pet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuContainerComponent } from './containers/menu-container/menu-container.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';
import { EditPetContainerComponent } from './containers/edit-pet-container/edit-pet-container.component';
import { TutorialsListContainerComponent } from './containers/tutorials-list-container/tutorials-list-container.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';

@NgModule({
  declarations: [
    PetsPageComponent,
    PetsListComponent,
    PetsListContainerComponent,
    AddPetContainerComponent,
    AddPetComponent,
    MenuContainerComponent,
    EditPetComponent,
    EditPetContainerComponent,
    TutorialsListContainerComponent,
    TutorialsListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PetsRoutingModule,
    SharedModule,
    StoreModule.forFeature(featureKey, reducers),
  ],
  providers: [PetsFacades, PetsService],
})
export class PetsModule {}
