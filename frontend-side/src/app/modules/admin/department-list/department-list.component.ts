import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ButtonModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent {
departments = [
    {
      name: 'IT',
      description: 'Software development department',
      employees: [{}, {}, {}]
    },
    {
      name: 'Marketing',
      description: 'Digital marketing team',
      employees: [{}]
    },
    {
      name: 'Finance',
      description: 'Financial management',
      employees: [{}, {}, {}, {}]
    }
  ];
}
