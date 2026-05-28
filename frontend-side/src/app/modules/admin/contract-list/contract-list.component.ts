import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ButtonModule],
  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.css'
})
export class ContractListComponent {
contracts = [
    {
      startdate: new Date('2024-01-01'),
      enddate: new Date('2025-01-01'),
      contractAmount: 25000,
      type: 'FULL_TIME',
      employeeId: 1
    },
    {
      startdate: new Date('2023-06-01'),
      enddate: new Date('2024-06-01'),
      contractAmount: 18000,
      type: 'PART_TIME',
      employeeId: 2
    },
    {
      startdate: new Date('2025-02-01'),
      enddate: new Date('2026-02-01'),
      contractAmount: 32000,
      type: 'FULL_TIME',
      employeeId: 3
    }
  ];
}
