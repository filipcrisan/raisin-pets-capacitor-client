import { Injectable } from '@angular/core';
import {
  LocalNotifications,
  PermissionStatus,
  ScheduleResult,
} from '@capacitor/local-notifications';
import { Reminder } from '../../pets/models/reminder.model';

@Injectable({
  providedIn: 'root',
})
export class LocalNotificationsService {
  requestPermission(): Promise<PermissionStatus> {
    return LocalNotifications.requestPermissions();
  }

  canSendLocalNotifications(): Promise<boolean> {
    return LocalNotifications.checkPermissions().then((x) => {
      return x.display === 'granted';
    });
  }

  schedule(reminder: Reminder): Promise<ScheduleResult> {
    const startAt = new Date();
    startAt.setHours(reminder.hours);
    startAt.setMinutes(reminder.minutes);
    startAt.setMilliseconds(0);

    return LocalNotifications.schedule({
      notifications: [
        {
          ...reminder,
          schedule: {
            at: startAt,
            every: 'day',
            allowWhileIdle: true,
          },
        },
      ],
    });
  }

  cancel(id: number): Promise<void> {
    return LocalNotifications.cancel({
      notifications: [
        {
          id,
        },
      ],
    });
  }
}
