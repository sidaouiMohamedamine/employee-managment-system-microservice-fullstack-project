import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputTextModule,
    ButtonModule,
    CardModule
        
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employeeForm: any;

  constructor(private fb: FormBuilder) {

  this.employeeForm = this.fb.group({

    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.pattern(/^[0-9+ ]{8,15}$/)]],
    salary: [0, [Validators.required, Validators.min(300)]],
    adress: [''],

    level: [null, Validators.required],
    team: [null, Validators.required],
    department: [null, Validators.required],
    contract: [null, Validators.required]

  });
  }
  get f() {
    return this.employeeForm.controls;
  }

  levels = [
    { label: 'JUNIOR', value: 'JUNIOR' },
    { label: 'SENIOR', value: 'SENIOR' },
    { label: 'EXPERT', value: 'EXPERT' }
  ];

  teams = [];
  departments = [];
  contracts = [];

}
