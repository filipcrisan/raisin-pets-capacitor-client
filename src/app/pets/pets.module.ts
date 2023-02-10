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

@NgModule({
  declarations: [
    PetsPageComponent,
    PetsListComponent,
    PetsListContainerComponent,
    AddPetContainerComponent,
    AddPetComponent,
  ],
  imports: [
    CommonModule,
    PetsRoutingModule,
    SharedModule,
    StoreModule.forFeature(featureKey, reducers),
  ],
  providers: [PetsFacades, PetsService],
})
export class PetsModule {}
