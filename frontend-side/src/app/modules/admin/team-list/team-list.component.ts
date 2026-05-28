import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ButtonModule],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css'
})
export class TeamListComponent {
  
teams = [
    {
      name: 'Backend Team',
      description: 'Spring Boot microservices',
      employees: [{}, {}, {}]
    },
    {
      name: 'Frontend Team',
      description: 'Angular development',
      employees: [{}, {}]
    },
    {
      name: 'HR Team',
      description: 'Human resources management',
      employees: [{}]
    }
  ];

}
