import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { ExercisesFacades } from '../../facades/exercises.facades';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exercise-details-container',
  templateUrl: './exercise-details-container.component.html',
  styleUrls: ['./exercise-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseDetailsContainerComponent {
  exercisesQuery = this.exercisesFacades.query.exercises;

  exerciseId!: number;
  exercise$ = this.exercisesQuery.entities$.pipe(
    map((x) => x.find((y) => y.id === this.exerciseId))
  );

  constructor(
    private exercisesFacades: ExercisesFacades,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.exerciseId = +this.activatedRoute.snapshot.params['id'];
  }

  onBack(): void {
    this.location.back();
  }
}
