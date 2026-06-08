import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamService } from '../../../core/services/teams/team.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputTextModule,
    ButtonModule],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css'
})
export class AddTeamComponent {
teamForm: FormGroup;
editingId: number | null = null;

  constructor(
  private fb: FormBuilder,
  private teamService: TeamService,
  private router: Router,
  private route: ActivatedRoute
) {
  this.teamForm = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });
}
ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.editingId = +id;

    this.teamService.getById(this.editingId).subscribe({
      next: (data: any) => {
        this.teamForm.patchValue({
          name: data.name,
          description: data.description
        });
      },
      error: (err) => console.error(err)
    });
  }
}

  submit() {
  if (this.teamForm.invalid) {
    this.teamForm.markAllAsTouched();
    return;
  }

  const payload = this.teamForm.value;

  // UPDATE MODE
  if (this.editingId) {
    this.teamService.update(this.editingId, payload).subscribe({
      next: () => {
        this.router.navigate(['/admin-dashboard/team-list']);
      },
      error: (err) => console.error('Update error', err)
    });

  } 
  // CREATE MODE
  else {
    this.teamService.create(payload).subscribe({
      next: () => {
        this.router.navigate(['/admin-dashboard/team-list']);
      },
      error: (err) => console.error('Create error', err)
    });
  }
}

get isEdit(): boolean {
  return this.editingId !== null;
}


}
