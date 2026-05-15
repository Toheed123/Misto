import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/core/service/notification.service';
import { NotificationType , Notification} from './notification';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    standalone: false
})
export class NotificationComponent {

  notifications: Notification[] = [];
  private _subscription: Subscription;
  progress : number = 0

  constructor(private _notificationSvc: NotificationService) {}

private _addNotification(notification: Notification) {
    this.notifications.push(notification);
    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);

    }
  }

 ngOnInit() {
    this._subscription = this._notificationSvc.getObservable().subscribe(notification => this._addNotification(notification));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  close(notification: Notification) {
    this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
  }


className(notification: Notification): string {

    let style: string;

    switch (notification.type) {

      case NotificationType.success:
        style = 'success';
        break;

      case NotificationType.warning:
        style = 'warning';
        break;

      case NotificationType.error:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }

  iconName(notification: Notification): string {

    let icon: string;

    switch (notification.type) {

      case NotificationType.success:
        icon = 'done';
        break;

      case NotificationType.warning:
        icon = 'warning';
        break;

      case NotificationType.error:
        icon = 'priority_high';
        break;

      default:
        icon = 'info';
        break;
    }

    return icon;
  }

}