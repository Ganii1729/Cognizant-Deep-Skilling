import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of, firstValueFrom } from 'rxjs';
import { describe, beforeEach, it, expect } from 'vitest';
import { CourseListComponent } from './course-list.component';
import { Course } from '../../models/course.model';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

describe('CourseListComponent (NgRx Connected Component)', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const initialState = {
    course: { courses: [], loading: false, error: null },
    enrollment: { enrolledCourseIds: [1] }
  };

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideMockStore({ initialState }),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({ get: () => null })
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllCourses, mockCourses);
    store.overrideSelector(selectCoursesLoading, false);
    store.overrideSelector(selectCoursesError, null);
    store.overrideSelector(selectEnrolledIds, [1]);

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
  });

  it('should create the store-connected CourseListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should select all courses from NgRx mock store', async () => {
    const courses = await firstValueFrom(component.courses$);
    expect(courses.length).toBe(1);
    expect(courses[0].code).toBe('CS101');
  });
});
