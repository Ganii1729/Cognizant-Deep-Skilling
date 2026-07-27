import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { EnrollmentFormComponent } from './pages/enrollment-form/enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from './pages/reactive-enrollment-form/reactive-enrollment-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Nested routing layout (Hands-On 7 Task 1 Step 72)
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseDetailComponent }
    ]
  },

  // Protected routes with AuthGuard (Hands-On 7 Task 2 Step 76)
  {
    path: 'enroll',
    component: EnrollmentFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentFormComponent,
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard] // Hands-On 7 Task 2 Step 77
  },
  {
    path: 'profile',
    component: StudentProfileComponent,
    canActivate: [authGuard]
  },

  // Lazy loading feature module (Hands-On 7 Task 2 Step 73)
  {
    path: 'enroll-feature',
    loadChildren: () => import('./features/enrollment/enrollment.module').then(m => m.EnrollmentModule),
    canActivate: [authGuard]
  },

  // Wildcard route MUST be last (Hands-On 7 Task 1 Step 68)
  { path: '**', component: NotFoundComponent }
];
