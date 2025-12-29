import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    // Validation
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    console.log('🔐 Tentative de connexion:', { email: this.email });

    // Login sans envoyer le rôle
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('Réponse complète:', response);

        const tokenFromHeader = response.headers.get('Authorization');
        const tokenFromBody = response.body?.token;
        const roleFromBody = response.body?.role;

        const token = tokenFromHeader || (tokenFromBody ? 'Bearer ' + tokenFromBody : null);

        console.log(' Token reçu:', token);
        console.log('Rôle reçu:', roleFromBody);

        if (token) {
          this.authService.saveToken(token);

          if (roleFromBody) {
            localStorage.setItem('userRole', roleFromBody);
          }

          // Récupérer le rôle
          const userRole = this.authService.getUserRole();
          console.log('Rôle vérifié:', userRole);

          this.successMessage = ' Connexion réussie !';
          this.errorMessage = '';
          this.isLoading = false;


          setTimeout(() => {
            if (userRole === 'ADMIN') {
              console.log('Redirection vers /admin/dashboard');
              this.router.navigate(['/admin/dashboard']);
            } else if (userRole === 'USER') {
              console.log('Redirection vers /dashboard');
              this.router.navigate(['/user/aliments']);
            } else {
              console.log('Rôle inconnu, redirection vers /login');
              this.errorMessage = 'Rôle utilisateur non reconnu';
              this.authService.logout();
            }
          }, 1000);
        } else {
          this.errorMessage = 'Token introuvable dans la réponse';
          this.successMessage = '';
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
        this.errorMessage = err.error?.message || err.error || 'Email ou mot de passe incorrect';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }
}
