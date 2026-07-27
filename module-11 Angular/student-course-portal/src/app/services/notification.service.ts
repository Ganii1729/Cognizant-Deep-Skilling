import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private instanceId = Math.floor(Math.random() * 10000);
  private notifications: string[] = [];

  constructor() {
    console.log(`NotificationService instance created with ID: ${this.instanceId}`);
  }

  getInstanceId(): number {
    return this.instanceId;
  }

  addNotification(message: string): void {
    this.notifications.push(`[Instance ${this.instanceId}] ${message}`);
  }

  getNotifications(): string[] {
    return [...this.notifications];
  }
}
