import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,
    RouterModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({ username: this.username, email: this.email, password: this.password })
      .subscribe({
        next: (res: string) => {
          console.log("Réponse backend:", res);
          this.successMessage = res;
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          console.error("Erreur HTTP:", err);
          this.errorMessage = err.error || 'Erreur lors de l\'inscription';
          this.successMessage = '';
        }
      });

  }
}
