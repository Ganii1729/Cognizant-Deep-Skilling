import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  // Step 102: Verification component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 103: Test for @Input rendering
  it('should display the course name when @Input course is set', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.course-name')).nativeElement;
    expect(titleEl.textContent).toContain('Data Structures');
  });

  // Step 104: Test for @Output emission
  it('should emit enrollRequested event with course ID on button click', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.enrollRequested, 'emit');

    const enrollBtn = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    enrollBtn.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  // Step 105: Test for ngOnChanges
  it('should log previous and current values when ngOnChanges is called', () => {
    const logSpy = vi.spyOn(console, 'log');

    const prevCourse: Course = { ...mockCourse, name: 'Old Course' };
    const currCourse: Course = { ...mockCourse, name: 'New Course' };

    component.course = currCourse;
    component.ngOnChanges({
      course: new SimpleChange(prevCourse, currCourse, false)
    });

    expect(logSpy).toHaveBeenCalledWith(
      'CourseCardComponent ngOnChanges fired - Previous:',
      prevCourse,
      'Current:',
      currCourse
    );
  });
});
