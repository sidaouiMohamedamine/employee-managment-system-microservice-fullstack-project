import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Department } from '../../../core/models/department';
import { DepartmentService } from '../../../core/services/departments/department.service';
import { ActivatedRoute, Router } from '@angular/router';
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
departments: Department[] = [];
editingId: number | null = null;


  constructor(
    private fb:      FormBuilder,
    private departmentService: DepartmentService,
    private router:Router,
    private route: ActivatedRoute


  ) {

    this.departmentForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']

    });

  }

    ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.editingId = +id;

    this.departmentService.getById(this.editingId).subscribe({
      next: (data) => {
        this.departmentForm.patchValue({
          name: data.name,
          description: data.description
        });
      },
      error: (err) => console.error(err)
    });
  }
}
  get f() { return this.departmentForm.controls; }
get isEdit(): boolean {
  return this.editingId !== null;
}

  submit(): void {

  if (this.departmentForm.invalid) {
    this.departmentForm.markAllAsTouched();
    return;
  }

  const payload: Department = this.departmentForm.value;

  // UPDATE MODE
  if (this.editingId) {
    this.departmentService.update(this.editingId, payload).subscribe({
      next: () => {
        this.router.navigate(['/admin-dashboard/department-list']);
      },
      error: (err) => console.error('Update error', err)
    });

  } 
  // CREATE MODE
  else {
    this.departmentService.create(payload).subscribe({
      next: () => {
        this.router.navigate(['/admin-dashboard/department-list']);
      },
      error: (err) => console.error('Create error', err)
    });
  }
}
}
