import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExerciseComponent {
  @Input() watchId: string;
  @Input() saving: boolean;
  @Input() error: HttpErrorResponse;

  @Output() exerciseChanged = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  onExerciseChanged(): void {
    this.exerciseChanged.emit();
  }

  onBack(): void {
    this.back.emit();
  }
}
