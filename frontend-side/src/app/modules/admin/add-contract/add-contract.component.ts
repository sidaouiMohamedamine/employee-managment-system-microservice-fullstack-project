import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-contract',
  standalone: true,
  imports: [
     CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    ButtonModule
  ],
  templateUrl: './add-contract.component.html',
  styleUrl: './add-contract.component.css'
})
export class AddContractComponent {
 contractForm: FormGroup;

  types = [
    { label: 'FULL_TIME', value: 'FULL_TIME' },
    { label: 'PART_TIME', value: 'PART_TIME' },
    { label: 'INTERNSHIP', value: 'INTERNSHIP' }
  ];

  constructor(private fb: FormBuilder) {
    this.contractForm = this.fb.group({
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      contractAmount: ['', Validators.required],
      type: ['', Validators.required],
      employeeId: ['', Validators.required]
    });
  }

  submit() {
    console.log(this.contractForm.value);
  }
}
