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

@NgModule({
  declarations: [
    PetsPageComponent,
    PetsListComponent,
    PetsListContainerComponent,
  ],
  imports: [
    CommonModule,
    PetsRoutingModule,
    StoreModule.forFeature(featureKey, reducers),
  ],
  providers: [PetsFacades, PetsService],
})
export class PetsModule {}
