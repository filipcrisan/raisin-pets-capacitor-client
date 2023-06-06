import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Reminder } from '../../models/reminder.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LocalNotificationsService } from '../../../shared/services/local-notifications.service';
import { RemindersFacades } from '../../facades/reminders.facades';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
@Component({
  selector: 'app-add-reminder-container',
  templateUrl: './add-reminder-container.component.html',
  styleUrls: ['./add-reminder-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReminderContainerComponent {
  remindersQuery: any;

  petId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private remindersFacades: RemindersFacades,
    private localNotificationsService: LocalNotificationsService,
    private toastr: ToastrService
  ) {
    this.petId = +this.activatedRoute.snapshot.params['id'];
    this.remindersQuery = this.remindersFacades.query(this.petId).reminders;
  }

  onAddReminder(reminder: Reminder): void {
    reminder.petId = this.petId;

    this.remindersFacades
      .addReminder(reminder)
      .pipe(
        untilDestroyed(this),
        tap({
          next: async (reminder) => {
            await this.scheduleNotification(reminder);
          },
        })
      )
      .subscribe();
  }

  onBack(): void {
    this.router
      .navigate([`reminders/${this.petId}`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }

  private async scheduleNotification(reminder: Reminder): Promise<void> {
    const canSendNotifications =
      (await this.localNotificationsService.canSendLocalNotifications()) ||
      (await this.localNotificationsService.requestPermission());

    if (!canSendNotifications) {
      this.toastr.error('No permissions to show notifications.');
      return;
    }

    this.localNotificationsService.schedule(reminder).then(
      () => {
        this.onBack();
      },
      () => {
        this.toastr.error('Error upon scheduling reminder. Please try again.');
      }
    );
  }
}
