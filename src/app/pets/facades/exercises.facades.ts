import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { PetsApiActions, PetsPageActions } from '../actions';
import { petsQuery } from '../reducers/pets.selector';
import { ExercisesService } from '../services/exercises.service';
import { Exercise } from '../models/exercise.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ExercisesFacades {
  query = (petId: number) => ({
    exercises: {
      entities$: this.store.select(petsQuery.getExercises(petId)),
      loading$: this.store.select(petsQuery.getExercisesLoading(petId)),
      loaded$: this.store.select(petsQuery.getExercisesLoaded(petId)),
      error$: this.store.select(petsQuery.getExercisesError(petId)),
      saving$: this.store.select(petsQuery.getExercisesSaving(petId)),
    },
  });

  constructor(
    private store: Store,
    private exercisesService: ExercisesService,
    private toastr: ToastrService
  ) {}

  getAllExercises(petId: number): Observable<Exercise[]> {
    this.store.dispatch(PetsPageActions.getAllExercises({ petId }));

    return this.exercisesService.getAllExercises(petId).pipe(
      tap({
        next: (exercises) => {
          this.store.dispatch(
            PetsApiActions.getAllExercisesSuccess({ petId, exercises })
          );
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error('Error upon fetching exercises. Please try again.');

          this.store.dispatch(
            PetsApiActions.getAllExercisesFailure({ petId, error })
          );
        },
      })
    );
  }

  addExercise(exercise: Exercise): Observable<Exercise> {
    this.store.dispatch(PetsPageActions.addExercise({ petId: exercise.petId }));

    return this.exercisesService.addExercise(exercise).pipe(
      tap({
        next: (exercise) => {
          this.store.dispatch(PetsApiActions.addExerciseSuccess({ exercise }));
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error('Error upon adding exercise. Please try again.');

          this.store.dispatch(
            PetsApiActions.addExerciseFailure({ petId: exercise.petId, error })
          );
        },
      })
    );
  }

  deleteExercise(petId: number, exerciseId: number): Observable<Exercise> {
    this.store.dispatch(PetsPageActions.deleteExercise({ petId }));

    return this.exercisesService.deleteExercise(petId, exerciseId).pipe(
      tap({
        next: (exercise) => {
          this.store.dispatch(
            PetsApiActions.deleteExerciseSuccess({ exercise })
          );
        },
        error: () => {
          this.toastr.error('Error upon deleting exercise. Please try again.');
        },
      })
    );
  }

  isGoogleMapsApiLoaded(): Observable<boolean> {
    return this.exercisesService.isGoogleMapsApiLoaded();
  }
}
