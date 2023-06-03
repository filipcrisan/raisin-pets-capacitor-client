import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, NgOptimizedImage } from '@angular/common';
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
import { TutorialsService } from './services/tutorials.service';
import { ExercisesService } from './services/exercises.service';
import { ExercisesFacades } from './facades/exercises.facades';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';
import { PetMenuContainerComponent } from './containers/pet-menu-container/pet-menu-container.component';
import { ExercisesListContainerComponent } from './containers/exercises-list-container/exercises-list-container.component';
import { AddExerciseContainerComponent } from './containers/add-exercise-container/add-exercise-container.component';
import { AddExerciseComponent } from './components/add-exercise/add-exercise.component';
import { ExerciseDetailsContainerComponent } from './containers/exercise-details-container/exercise-details-container.component';
import { ExerciseDetailsComponent } from './components/exercise-details/exercise-details.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RemindersListContainerComponent } from './containers/reminders-list-container/reminders-list-container.component';
import { RemindersFacades } from './facades/reminders.facades';
import { RemindersService } from './services/reminders.service';
import { RemindersListComponent } from './components/reminders-list/reminders-list.component';
import { AddReminderContainerComponent } from './containers/add-reminder-container/add-reminder-container.component';
import { AddReminderComponent } from './components/add-reminder/add-reminder.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SharedFacades } from './facades/shared.facades';

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
    ExercisesListComponent,
    PetMenuContainerComponent,
    ExercisesListContainerComponent,
    AddExerciseContainerComponent,
    AddExerciseComponent,
    ExerciseDetailsContainerComponent,
    ExerciseDetailsComponent,
    RemindersListContainerComponent,
    RemindersListComponent,
    AddReminderContainerComponent,
    AddReminderComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PetsRoutingModule,
    SharedModule,
    StoreModule.forFeature(featureKey, reducers),
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgOptimizedImage,
  ],
  providers: [
    PetsFacades,
    PetsService,
    TutorialsService,
    ExercisesService,
    ExercisesFacades,
    RemindersFacades,
    RemindersService,
    DecimalPipe,
    SharedFacades,
  ],
})
export class PetsModule {}
