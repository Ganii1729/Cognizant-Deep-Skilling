import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-widget">
      <h4>Course Summary Widget (Singleton Demo)</h4>
      <p>Total Managed Courses: <strong>{{ courses.length }}</strong></p>
      <p>Total Credits: <strong>{{ totalCredits }}</strong></p>
    </div>
  `,
  styles: [`
    .summary-widget {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
    }
    h4 { margin: 0 0 0.5rem 0; color: #0369a1; }
    p { margin: 0.25rem 0; color: #0c4a6e; }
  `]
})
export class CourseSummaryWidgetComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses = this.courseService.getLocalCourses();
  }

  get totalCredits(): number {
    return this.courses.reduce((sum, c) => sum + c.credits, 0);
  }
}
