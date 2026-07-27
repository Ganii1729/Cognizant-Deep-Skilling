import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import * as CourseActions from '../../store/course/course.actions';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {
  isLoading = true;
  courses: Course[] = [];
  selectedCourseId: number | null = null;
  searchTerm = '';
  errorMessage: string | null = null;

  // NgRx Observables
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  enrolledIds$: Observable<number[]>;

  private routeSub!: Subscription;

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  ngOnInit(): void {
    // Hands-On 3 Task 1: Loading simulation (1.5s)
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    // Hands-On 9 Task 1: Dispatch NgRx Load Courses action
    this.store.dispatch(CourseActions.loadCourses());

    // Fallback sync service data population
    this.courses = this.courseService.getLocalCourses();

    // Hands-On 7 Task 1 Step 71: Read search query param
    this.routeSub = this.route.queryParamMap.subscribe(params => {
      const search = params.get('search');
      if (search !== null) {
        this.searchTerm = search;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  // Explanation: trackBy prevents Angular from re-creating DOM nodes for unchanged array items.
  // By returning course.id, Angular reuses existing DOM nodes and only updates modified items.
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onSearchChange(): void {
    // Hands-On 7 Task 1: Update query param /courses?search=angular
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;

    if (this.enrollmentService.isEnrolled(courseId)) {
      this.enrollmentService.unenroll(courseId);
      this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId }));
    } else {
      this.enrollmentService.enroll(courseId);
      this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId }));
    }
  }

  isEnrolledInService(courseId: number): boolean {
    return this.enrollmentService.isEnrolled(courseId);
  }

  get filteredCourses(): Course[] {
    if (!this.searchTerm.trim()) {
      return this.courses;
    }
    const term = this.searchTerm.toLowerCase();
    return this.courses.filter(
      c => c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term)
    );
  }
}
