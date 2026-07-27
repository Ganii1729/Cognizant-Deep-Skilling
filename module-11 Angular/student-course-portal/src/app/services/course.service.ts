import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry, switchMap } from 'rxjs/operators';
import { Course, Student } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private initialCourses: Course[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Development with Angular', code: 'CS202', credits: 3, gradeStatus: 'passed' },
    { id: 3, name: 'Database Systems & SQL', code: 'CS303', credits: 3, gradeStatus: 'pending' },
    { id: 4, name: 'Operating Systems Internals', code: 'CS404', credits: 4, gradeStatus: 'failed' },
    { id: 5, name: 'Cloud Computing & DevOps', code: 'CS505', credits: 2, gradeStatus: 'pending' }
  ];

  constructor(private http: HttpClient) {}

  // Synchronous / Memory methods for early Hands-On exercises
  getLocalCourses(): Course[] {
    return this.initialCourses;
  }

  getLocalCourseById(id: number): Course | undefined {
    return this.initialCourses.find(c => c.id === id);
  }

  addLocalCourse(course: Course): void {
    this.initialCourses.push(course);
  }

  // HTTP API Operations (Hands-On 8)
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // tap for side effects (logging) - tap is preferred over map for side-effects because it does not mutate the stream
      tap(courses => console.log('Courses loaded from HTTP API:', courses.length)),
      // map operator transforming API response (filtering non-zero credit courses)
      map(courses => courses.filter(c => c.credits > 0)),
      // retry failed requests up to 2 times before throwing
      retry(2),
      // catchError for graceful handling
      catchError(err => {
        console.warn('HTTP fetch failed, falling back to local dataset:', err);
        return of(this.initialCourses);
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(err => {
        console.warn(`HTTP fetch failed for course ${id}, checking local data:`, err);
        const match = this.getLocalCourseById(id);
        if (match) {
          return of(match);
        }
        return throwError(() => new Error(`Course with ID ${id} not found.`));
      })
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => {
        this.initialCourses.push(newCourse);
      }),
      catchError(err => {
        console.error('Error creating course via HTTP:', err);
        const fallbackCourse: Course = { ...course, id: Date.now() };
        this.initialCourses.push(fallbackCourse);
        return of(fallbackCourse);
      })
    );
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      catchError(err => {
        console.error('Error updating course via HTTP:', err);
        return throwError(() => new Error('Failed to update course.'));
      })
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.initialCourses = this.initialCourses.filter(c => c.id !== id);
      }),
      catchError(err => {
        console.error('Error deleting course via HTTP:', err);
        this.initialCourses = this.initialCourses.filter(c => c.id !== id);
        return of(undefined);
      })
    );
  }

  // Chained call using switchMap: loads enrolled students for a selected course
  // switchMap cancels the previous inner Observable if a new courseId arrives before completion
  getEnrolledStudentsForCourse(courseId: number): Observable<Student[]> {
    return of(courseId).pipe(
      switchMap(id => this.http.get<Student[]>(`http://localhost:3000/students?enrolledCourseIds_like=${id}`)),
      catchError(err => {
        console.warn('Could not load students via HTTP API:', err);
        return of([
          { id: 101, name: 'Alex Johnson', email: 'alex.johnson@university.edu', enrolledCourseIds: [1, 2] }
        ]);
      })
    );
  }
}
