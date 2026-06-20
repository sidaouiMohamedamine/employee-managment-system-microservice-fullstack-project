import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ContractService } from '../../../core/services/contracts/contract.service';
import { Contract } from '../../../core/models/Contract';
import { EmployeeService } from '../../../core/services/employees/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-contract',
  standalone: true,
  imports: [
     CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './add-contract.component.html',
  styleUrl: './add-contract.component.css'
})
export class AddContractComponent {
 contractForm: FormGroup;
 isEditMode = false;
contractId!: number;

types = [
  { label: 'CDI', value: 'CDI' },
  { label: 'CDD', value: 'CDD' },
  { label: 'CIVP', value: 'CIVP' },
    { label: 'FREELANCE', value: 'FREELANCE' },
  { label: 'INTERNSHIP', value: 'INTERNSHIP' },
  { label: 'CONSULTANT', value: 'CONSULTANT' },

];

employees: any[] = [];
  constructor(
      private fb: FormBuilder,
      private contractService: ContractService,
      private employeeService: EmployeeService,
      private router:Router,
      private route:ActivatedRoute


  ) {
    this.contractForm = this.fb.group({
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      contractAmount: ['', Validators.required],
      type: ['', Validators.required],
      employeeId: ['', Validators.required]
    });
  }
  ngOnInit() {

  this.employeeService.getAll()
    .subscribe(data => {

      this.employees = data.map((e:any) => ({
        label: e.firstname + ' ' + e.lastname,
        value: e.id
      }));

    });
 const id = this.route.snapshot.paramMap.get('id');

  if (id) {

    this.isEditMode = true;
    this.contractId = +id;

    this.contractService.getById(this.contractId)
      .subscribe(contract => {

        this.contractForm.patchValue({
          startdate: contract.startdate,
          enddate: contract.enddate,
          contractAmount: contract.contractAmount,
          employeeId: contract.employeeId,
          type: contract.type
        });

      });

  }
}

 submit(): void {

    if (this.contractForm.invalid) {
      this.contractForm.markAllAsTouched();
      return;
    }

    const contract: Contract = this.contractForm.value;

    this.contractService.create(contract)
      .subscribe({

        next: (response) => {

          console.log('Contract created', response);

          this.router.navigate(['/admin-dashboard/contract-list']);


          this.contractForm.reset();
        },

        error: (error) => {

          console.error(error);

          alert('Error while creating contract');
        }
      });
  }

  
}
