import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;

  submitted = false;
  submittedData: any = null;

  constructor(private courseService: CourseService) {}

  onSubmit(form: NgForm): void {
    console.log('Template Form Value:', form.value);
    console.log('Template Form Valid State:', form.valid);

    if (form.valid) {
      this.submitted = true;
      this.submittedData = { ...form.value };

      // Optional API post call simulation
      this.courseService.createCourse({
        name: `Enrollment Request (${this.studentName})`,
        code: `ENR${this.courseId || '00'}`,
        credits: 3,
        gradeStatus: 'pending'
      }).subscribe();
    }
  }

  onReset(form: NgForm): void {
    form.resetForm({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.submitted = false;
    this.submittedData = null;
  }
}
