import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
teamOpen = false;
departmentOpen = false;
employeeOpen = false;
contractOpen = false
toggleTeam(){
  this.teamOpen = !this.teamOpen;
}
toggleDepartment(){
  this.departmentOpen = !this.departmentOpen;
}
toggleEmployee(){
  this.employeeOpen = !this.employeeOpen;
}
toggleContract(){
  this.contractOpen = !this.contractOpen;
}

}
