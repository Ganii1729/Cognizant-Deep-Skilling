import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Input() isEnrolled = false;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      const prev = changes['course'].previousValue;
      const curr = changes['course'].currentValue;
      console.log('CourseCardComponent ngOnChanges fired - Previous:', prev, 'Current:', curr);
    }
  }

  // Refactored getter for clean template binding (Hands-On 3 Task 2 Step 32)
  // Explanation: Getters keep templates clean, maintainable, and prevent template clutter.
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course?.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  get borderStyle() {
    switch (this.course?.gradeStatus) {
      case 'passed':
        return { 'border-left': '6px solid #22c55e' };
      case 'failed':
        return { 'border-left': '6px solid #ef4444' };
      case 'pending':
      default:
        return { 'border-left': '6px solid #94a3b8' };
    }
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(): void {
    if (this.course) {
      this.enrollRequested.emit(this.course.id);
    }
  }
}
