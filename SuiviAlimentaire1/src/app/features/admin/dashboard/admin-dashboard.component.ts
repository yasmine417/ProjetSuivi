import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

import { AlimentService, Aliment } from '../../../core/services/aliment.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  aliments: Aliment[] = [];
  totalAliments = 0;
  isLoading = true;
  errorMessage = '';


  showAlimentsModal = false;

  constructor(
    private authService: AuthService,
    private alimentService: AlimentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    this.errorMessage = '';


    this.alimentService.getAllAliments().subscribe({
      next: (aliments) => {
        this.aliments = aliments;
        this.totalAliments = aliments.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement aliments:', err);
        this.errorMessage = 'Erreur lors du chargement des aliments';
        this.isLoading = false;
      }
    });
  }


  openAlimentsModal() {
    this.showAlimentsModal = true;
    this.loadDashboardData(); // Recharger les aliments à l'ouverture
  }

  closeAlimentsModal() {
    this.showAlimentsModal = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
