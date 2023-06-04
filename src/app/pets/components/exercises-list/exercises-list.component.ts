import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Exercise } from '../../models/exercise.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesListComponent {
  @Input() exercises: Exercise[];
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() error: HttpErrorResponse;

  @Output() selectExercise = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onSelectExercise(id: number): void {
    this.selectExercise.emit(id);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}
