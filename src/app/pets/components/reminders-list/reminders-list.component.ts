import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Reminder } from '../../models/reminder.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindersListComponent {
  @Input() reminders: Reminder[];
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse;

  @Output() delete = new EventEmitter<number>();

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}
