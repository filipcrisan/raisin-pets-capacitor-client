import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LocalNotificationsService } from '../../../shared/services/local-notifications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RemindersFacades } from '../../facades/reminders.facades';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'app-reminders-list-container',
  templateUrl: './reminders-list-container.component.html',
  styleUrls: ['./reminders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindersListContainerComponent implements AfterViewInit {
  remindersQuery: any;

  petId!: number;

  constructor(
    private localNotificationsService: LocalNotificationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private remindersFacades: RemindersFacades,
    private dialog: MatDialog
  ) {
    this.petId = +this.activatedRoute.snapshot.params['id'];
    this.remindersQuery = this.remindersFacades.query(this.petId).reminders;
  }

  ngOnInit(): void {
    this.remindersQuery.loaded$
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        filter((loaded) => !loaded),
        switchMap(() => this.remindersFacades.getAllReminders(this.petId))
      )
      .subscribe();
  }

  onRefreshList(): void {
    this.remindersFacades
      .getAllReminders(this.petId)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  ngAfterViewInit(): void {
    console.log('Reminders list: ', performance.now());
  }

  onAddReminder(): void {
    this.router
      .navigate([`add-reminder/${this.petId}`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }

  onBack(): void {
    this.router
      .navigate([`menu/${this.petId}`], {
        relativeTo: this.activatedRoute.parent,
      })
      .then();
  }

  onDelete(reminderId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete reminder',
        message: 'Are you sure you want to delete this reminder?',
        buttonLabel: 'Delete',
      },
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter((x) => !!x),
        switchMap(() => {
          return this.remindersFacades
            .deleteReminder(this.petId, reminderId)
            .pipe(
              untilDestroyed(this),
              tap({
                next: async () => {
                  await this.localNotificationsService.cancel(reminderId);
                },
              })
            );
        })
      )
      .subscribe();
  }
}
