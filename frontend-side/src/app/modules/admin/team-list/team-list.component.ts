import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { TeamService } from '../../../core/services/teams/team.service';
@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    ConfirmDialogModule
  
  ],
  providers: [ConfirmationService],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css'
})
export class TeamListComponent {
  
 teams: any[] = [];
  rows = 8;

  constructor(
    private teamService: TeamService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getAll().subscribe({
      next: (data) => this.teams = data,
      error: (err) => console.error(err)
    });
  }

  deleteTeam(id: number, name?: string) {

    this.confirmationService.confirm({
      message: `Are you sure you want to delete team "${name}" ?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.teamService.delete(id).subscribe({
          next: () => this.loadTeams(),
          error: (err) => console.error(err)

        });
      }
    });
  }

  editTeam(id: number) {
    this.router.navigate(['/admin-dashboard/edit-team', id]);
  }
}
