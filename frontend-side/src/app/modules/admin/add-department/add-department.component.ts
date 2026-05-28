import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [  
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.css'
})
export class AddDepartmentComponent {
departmentForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.departmentForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']

    });

  }

  saveDepartment() {

    console.log(this.departmentForm.value);

  }
}
