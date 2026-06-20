import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { InputTextarea } from 'primeng/inputtextarea';

import { Router } from '@angular/router';

import { EmployeeService } from '../../../core/services/employees/employee.service';
import { DepartmentService } from '../../../core/services/departments/department.service';
import { TeamService } from '../../../core/services/teams/team.service';
import { ContractService } from '../../../core/services/contracts/contract.service';

import { Department } from '../../../core/models/department';
import { Team } from '../../../core/models/Team';
import { Contract } from '../../../core/models/Contract';
import { EmployeeRequest } from '../../../core/models/EmployeeRequest';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    InputTextarea,
    ButtonModule,
    CardModule,
    ToastModule,
    DropdownModule
  ],
  providers: [MessageService],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  loading = false;

  levels = [
    { label: 'Junior', value: 'JUNIOR' },
    { label: 'Senior', value: 'SENIOR' },
    { label: 'Expert', value: 'EXPERT' }
  ];

  departments: Department[] = [];
  teams: Team[] = [];
  contracts: Contract[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private empSvc: EmployeeService,
    private departmentService: DepartmentService,
    private teamService: TeamService,
    private contractService: ContractService,
    private msg: MessageService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDepartments();
    this.loadTeams();
    this.loadContracts();
  }

  // ================= FORM =================
  initForm(): void {
    this.employeeForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: [null,Validators.required],
      salary: [0, [Validators.required, Validators.min(300)]],
      adress: [''],
      level: [null, Validators.required],

      departement: [null, Validators.required],
      teamId: [null, Validators.required],
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  // ================= LOAD DATA =================
  loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: (data) => this.departments = data,
      error: (err) => console.error(err)
    });
  }

  loadTeams() {
    this.teamService.getAll().subscribe({
      next: (data) => this.teams = data,
      error: (err) => console.error(err)
    });
  }

  loadContracts() {
    this.contractService.getAll().subscribe({
      next: (data) => this.contracts = data,
      error: (err) => console.error(err)
    });
  }

  // ================= SUBMIT =================
  submit(): void {

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const form = this.employeeForm.value;

    const payload: EmployeeRequest = {
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      birthDate: form.birthDate,
      phonenumber: form.phonenumber,
      salary: form.salary,
      adress: form.adress,
      level: form.level,
      departement: { id: form.departement },
      team: { id: form.teamId },
      contract: {
        id: 0
      }
    };

    console.log('PAYLOAD =>', payload);

    this.empSvc.create(payload).subscribe({
      next: () => {
        this.msg.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee created successfully'
        });

        this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/admin-dashboard/employee-list']);
        }, 1200);
      },

      error: (err) => {
        this.loading = false;

        this.msg.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message ?? 'Create failed'
        });

        console.error(err);
      }
    });
  }
}