import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

/**
 * Explanation of Component-Level Providers (Hands-On 6 Task 2 Step 67):
 * Specifying providers: [NotificationService] in the @Component decorator instructs Angular's
 * Hierarchical Dependency Injection system to create a NEW, separate service instance scoped
 * exclusively to this component and its child components. This instance is NOT shared with the root
 * injector or other components, which is useful for isolated state management (e.g. step-by-step form wizards).
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService], // Component-level provider creates isolated instance
  template: `
    <div class="notification-box">
      <h5>Notification Component (Scoped DI Demo)</h5>
      <p>Instance ID: <strong>{{ instanceId }}</strong></p>
      <button (click)="addTestAlert()" class="btn-sm">Add Scoped Alert</button>
      <ul>
        <li *ngFor="let msg of notifications">{{ msg }}</li>
      </ul>
    </div>
  `,
  styles: [`
    .notification-box {
      background: #faf5ff;
      border: 1px solid #e9d5ff;
      padding: 0.85rem;
      border-radius: 8px;
      margin-top: 1rem;
    }
    h5 { margin: 0 0 0.5rem 0; color: #6b21a8; }
    p { margin: 0.25rem 0; color: #581c87; font-size: 0.9rem; }
    .btn-sm { background: #9333ea; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer; }
    ul { margin: 0.5rem 0 0 1.2rem; padding: 0; font-size: 0.85rem; }
  `]
})
export class NotificationComponent implements OnInit {
  instanceId!: number;
  notifications: string[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.instanceId = this.notificationService.getInstanceId();
    this.notificationService.addNotification('Initial scoped notification loaded');
    this.notifications = this.notificationService.getNotifications();
  }

  addTestAlert(): void {
    this.notificationService.addNotification(`Alert added at ${new Date().toLocaleTimeString()}`);
    this.notifications = this.notificationService.getNotifications();
  }
}
