import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  submit() {
    console.log(this.teamForm.value);
  }
}
