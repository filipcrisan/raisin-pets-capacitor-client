import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { ExercisesFacades } from '../../facades/exercises.facades';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { filter, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'app-exercises-list-container',
  templateUrl: './exercises-list-container.component.html',
  styleUrls: ['./exercises-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesListContainerComponent {
  exercisesQuery = this.exercisesFacades.query.exercises;

  petId!: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private exercisesFacades: ExercisesFacades,
    private dialog: MatDialog
  ) {
    this.petId = +this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.exercisesFacades
      .getAllExercises(this.petId)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  onAddExercise(): void {
    this.router
      .navigate([`add-exercise/${this.petId}`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }

  onSelectExercise(id: number): void {
    this.router
      .navigate([`exercise/${id}/details`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }

  onDelete(exerciseId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete exercise',
        message: 'Are you sure you want to delete this exercise?',
        buttonLabel: 'Delete',
      },
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter((x) => !!x),
        switchMap(() =>
          this.exercisesFacades.deleteExercise(this.petId, exerciseId)
        )
      )
      .subscribe();
  }

  onBack(): void {
    this.router
      .navigate([`menu/${this.petId}`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }
}
