import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Reminder } from '../../models/reminder.model';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReminderComponent {
  @Input() saving: boolean;
  @Input() error: HttpErrorResponse;

  @Output() addReminder = new EventEmitter<Reminder>();
  @Output() back = new EventEmitter<void>();

  reminderForm = new FormGroup({
    body: new FormControl(''),
    time: new FormControl(''),
  });

  onBack(): void {
    this.back.emit();
  }

  onSave(): void {
    if (!this.reminderForm.valid) {
      return;
    }

    const hours = +this.time.split(':')[0];
    const minutes = +this.time.split(':')[1];

    const startAt = new Date();
    startAt.setHours(hours);
    startAt.setMinutes(minutes);
    startAt.setMilliseconds(0);

    if (startAt.getTime() < new Date().getTime()) {
      return;
    }

    const reminder: Reminder = {
      id: 0,
      title: `It's ${this.time}!`,
      body: this.body,
      hours: hours,
      minutes: minutes,
      enabled: true,
    };

    this.addReminder.emit(reminder);
  }

  get body(): string {
    return this.reminderForm.controls.body.value;
  }

  get time(): string {
    return this.reminderForm.controls.time.value;
  }
}
