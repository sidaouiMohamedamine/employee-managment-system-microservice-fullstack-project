import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { TeamListComponent } from './team-list/team-list.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddContractComponent } from './add-contract/add-contract.component';

const routes: Routes = [
  {
      path: '',
      component:AdminDashboardComponent,
      children: [

      {
        path: 'add-departement',
        component: AddDepartmentComponent
      },
      {
        path: 'department-list',
        component: DepartmentListComponent
      },
      {
        path:"add-team",
        component: AddTeamComponent
      },
      {
        path: 'team-list',
        component: TeamListComponent
      },
      {
        path: 'add-contract',
        component: AddContractComponent
      },
      {
        path: 'contract-list',
        component: ContractListComponent
      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent
      },
    ]
    },
     
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
