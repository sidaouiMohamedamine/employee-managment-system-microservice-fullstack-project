import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../admin-routing.module';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
employees = [

    {
      firstname: 'Mohamed',
      lastname: 'Sidaoui',
      email: 'mohamed@gmail.com',
      salary: 2500,
      level: 'SENIOR',

      department: {
        name: 'IT'
      },

      team: {
        name: 'Backend Team'
      }
    },

    {
      firstname: 'Amine',
      lastname: 'Ben Salah',
      email: 'amine@gmail.com',
      salary: 1800,
      level: 'JUNIOR',

      department: {
        name: 'Marketing'
      },

      team: {
        name: 'Digital Team'
      }
    },

    {
      firstname: 'Sarah',
      lastname: 'Trabelsi',
      email: 'sarah@gmail.com',
      salary: 3200,
      level: 'EXPERT',

      department: {
        name: 'Finance'
      },

      team: {
        name: 'Accounting Team'
      }
    },

    {
      firstname: 'Youssef',
      lastname: 'Karray',
      email: 'youssef@gmail.com',
      salary: 2100,
      level: 'SENIOR',

      department: {
        name: 'Human Resources'
      },

      team: {
        name: 'HR Team'
      }
    }

  ];
}
