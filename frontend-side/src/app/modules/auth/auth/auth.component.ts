import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule
],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  loginForm: FormGroup;
  submitted  = false;
  loading    = false;
  errorMsg   = '';

  constructor(
    private fb:          FormBuilder,
    private authService: AuthService,
    private router:      Router
  ) {
    // Redirige si déjà connecté
    if (this.authService.isLoggedInSnapshot()) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Raccourci pour accéder aux contrôles dans le template
  get f() { return this.loginForm.controls; }

  submit(): void {
    this.submitted = true;
    this.errorMsg  = '';

    if (this.loginForm.invalid) return;

    this.loading = true;

    // Keycloak utilise "username" — on envoie l'email comme username
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['admin-dashboard']);
      },
      error: (err: Error) => {
        this.loading  = false;
        this.errorMsg = err.message;
      }
    });
  }

}
