import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserInfo } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
userInfo: UserInfo | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
  }

  logout(): void {
    this.authService.logout();
  }

}
