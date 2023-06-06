import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ExercisesFacades } from '../../facades/exercises.facades';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'app-exercise-details-container',
  templateUrl: './exercise-details-container.component.html',
  styleUrls: ['./exercise-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseDetailsContainerComponent {
  exercisesQuery: any;

  petId!: number;
  exerciseId!: number;
  exercise$: Observable<Exercise>;
  isGoogleMapsApiLoaded$ = this.exercisesFacades.isGoogleMapsApiLoaded();

  constructor(
    private exercisesFacades: ExercisesFacades,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.petId = +this.activatedRoute.snapshot.params['petId'];
    this.exerciseId = +this.activatedRoute.snapshot.params['exerciseId'];
    this.exercisesQuery = this.exercisesFacades.query(this.petId).exercises;
    this.exercise$ = this.exercisesQuery.entities$.pipe(
      map((x: Exercise[]) => x.find((y) => y.id === this.exerciseId))
    );
  }

  onBack(): void {
    this.location.back();
  }
}
