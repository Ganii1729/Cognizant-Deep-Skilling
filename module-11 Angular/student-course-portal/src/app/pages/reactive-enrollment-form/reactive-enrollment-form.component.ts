import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ComponentCanDeactivate } from '../../guards/unsaved-changes.guard';

/**
 * Custom Synchronous Validator (Hands-On 5 Task 2 Step 53):
 * Disallows course ID / codes that begin with 'XX'.
 */
export function noCourseCodeValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value || '').toUpperCase();
  if (value.startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

/**
 * Custom Async Validator (Hands-On 5 Task 2 Step 55):
 * Simulates a server-side email check returning a Promise after an 800ms delay.
 */
export function simulateEmailCheckValidator(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const email = String(control.value || '').toLowerCase();
      if (email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

/**
 * Explanation of value vs getRawValue() (Hands-On 5 Task 1 Step 52):
 * enrollForm.value: Returns an object containing the values of enabled controls only.
 * Disabled controls are filtered out and omitted from the returned object.
 * enrollForm.getRawValue(): Returns an object containing the values of ALL controls in the group,
 * including disabled controls. This is critical when you need disabled fields (e.g. read-only IDs) upon submission.
 */
@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrls: ['./reactive-enrollment-form.component.css']
})
export class ReactiveEnrollmentFormComponent implements OnInit, ComponentCanDeactivate {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheckValidator]],
      courseId: [null, [Validators.required, noCourseCodeValidator]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  // Typed getter for FormArray (Hands-On 5 Task 2 Step 57)
  // Explanation: A typed getter avoids casting in templates, provides type safety, and keeps template code clean.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      console.log('Reactive Form value (excludes disabled):', this.enrollForm.value);
      console.log('Reactive Form getRawValue() (includes disabled):', this.enrollForm.getRawValue());
      this.submitted = true;
      this.enrollForm.markAsPristine();
    }
  }

  // CanDeactivate guard check (Hands-On 7 Task 2 Step 77)
  canDeactivate(): boolean {
    if (this.enrollForm.dirty && !this.submitted) {
      return window.confirm('You have unsaved changes in your enrollment form. Are you sure you want to leave?');
    }
    return true;
  }
}
