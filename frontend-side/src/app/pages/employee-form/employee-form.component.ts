import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent {

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

  }

  submit() {
    if (this.employeeForm.valid) {
      console.log('FORM DATA:', this.employeeForm.value);
    } else {
      console.log('Form invalid');
    }
  }
}