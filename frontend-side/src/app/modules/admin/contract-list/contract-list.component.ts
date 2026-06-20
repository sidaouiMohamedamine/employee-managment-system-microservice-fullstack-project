import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ContractService } from '../../../core/services/contracts/contract.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from '../../../core/models/Contract';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EmployeeService } from '../../../core/services/employees/employee.service';
@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule,
    CardModule,
    ButtonModule,
    ConfirmDialogModule
],
  providers: [ConfirmationService],

  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.css'
})
export class ContractListComponent {
contracts: Contract[] = [];

  rows = 8;

  constructor(
    private contractService: ContractService,
    private employeeService: EmployeeService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.loadContracts();
    
  }

  loadContracts(): void {

  this.contractService.getAll().subscribe({

    next: (contracts) => {

      this.contracts = contracts;

      this.contracts.forEach(contract => {

        this.employeeService.getById(contract.employeeId)
          .subscribe({

            next: (employee) => {

              contract.employeeName =
                `${employee.firstname} ${employee.lastname}`;

            },

            error: () => {

              contract.employeeName = 'Unknown';

            }

          });

      });

    },

    error: (err) => console.error(err)

  });

}

  deleteContract(id: number): void {

    this.confirmationService.confirm({

      message: 'Are you sure you want to delete this contract ?',

      header: 'Delete Confirmation',

      icon: 'pi pi-exclamation-triangle',

      accept: () => {

        this.contractService.delete(id).subscribe({

          next: () => {
            this.loadContracts();
          },

          error: (err) => {
            console.error(err);
          }

        });

      }

    });
  }

  editContract(id: number): void {

    this.router.navigate([
      '/admin-dashboard/edit-contract',
      id
    ]);

  }

  viewContract(id: number): void {

    this.router.navigate([
      '/admin-dashboard/contract-details',
      id
    ]);

  }
  
}
