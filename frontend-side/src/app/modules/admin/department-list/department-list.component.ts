import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Department } from '../../../core/models/department';
import { DepartmentService } from '../../../core/services/departments/department.service';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-department-list',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CommonModule, TableModule, CardModule, ButtonModule,  ConfirmDialogModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent implements OnInit {

  departments: Department[] = [];

  // pagination UI
  rows = 5;

  constructor(
    private departmentService: DepartmentService,
    private router:Router,
    private confirmationService: ConfirmationService
) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: (data) => {
        this.departments = data;
        console.log (data)
      },
      error: (err) => {
        console.error('Error loading departments', err);
      }
    });
  }

deleteDepartment(id: number, name?: string) {

  this.confirmationService.confirm({
    message: `Are you sure you want to delete department "${name}" ?`,
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',

    accept: () => {
      this.departmentService.delete(id).subscribe({
        next: () => {
          this.loadDepartments();
        },
        error: (err) => {
          console.error('Delete error', err);
        }
      });
    },

    reject: () => {
      // rien (cancel)
    }
  });
}  

editDepartment(id: number) {
  this.router.navigate(['admin-dashboard/edit-departments', id]);
}
}