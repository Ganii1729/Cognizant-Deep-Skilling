import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { NotificationComponent } from '../../components/notification/notification.component';

/**
 * Data Binding Explanation (Hands-On 2 Task 1 Step 15):
 * [property] (One-Way Binding, Component -> DOM): Data flows exclusively from the TypeScript component
 * property into the DOM element property. Changes in the DOM do not automatically update the TS property.
 * [(ngModel)] (Two-Way Binding, DOM <-> Component): Data flows synchronously in both directions. Updates to the
 * DOM input element immediately update the TS property, and programmatic updates in TS immediately reflect in the DOM.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CourseSummaryWidgetComponent, NotificationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Interpolation
  portalName = 'Student Course Portal';

  // Property Binding
  isPortalActive = true;

  // Event Binding
  message = '';

  // Two-Way Binding
  searchTerm = '';

  // Service Data
  coursesCount = 12;
  enrolledCount = 3;
  gpa = 3.8;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    // Read live count from CourseService (Hands-On 6 Task 1)
    const localCourses = this.courseService.getLocalCourses();
    if (localCourses.length > 0) {
      this.coursesCount = localCourses.length;
    }
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
