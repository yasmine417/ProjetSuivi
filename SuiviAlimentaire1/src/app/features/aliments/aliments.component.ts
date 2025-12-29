import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlimentService, Aliment } from '../../core/services/aliment.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-aliments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './aliments.component.html',
  styleUrls: ['./aliments.component.scss']
})
export class AlimentsComponent implements OnInit {
  aliments: Aliment[] = [];
  filteredAliments: Aliment[] = [];
  loading = false;
  error: string | null = null;
  searchTerm = '';
  showForm = false;
  editingId: number | null = null;
  selectedAliment: Aliment | null = null;

  formData: Aliment = {
    nom: '',
    caloriesParPortion: 0,
    nutrimentsParPortion: ''
  };

  constructor(private alimentService: AlimentService ,private router: Router) {}

  ngOnInit(): void {
    this.fetchAliments();
  }

  fetchAliments(): void {
    this.loading = true;
    this.error = null;
    this.alimentService.getAllAliments().subscribe({
      next: (data) => {
        this.aliments = data;
        this.filterAliments();
        this.loading = false;
      },
      error: (err) => {
        this.error = `Erreur de connexion: ${err.message}. Vérifiez que le backend est démarré sur le port 8081.`;
        this.loading = false;
      }
    });
  }

  filterAliments(): void {
    this.filteredAliments = this.aliments.filter(aliment =>
      aliment.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange(): void {
    this.filterAliments();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  handleSubmit(): void {
    this.error = null;

    if (this.editingId) {
      this.alimentService.updateAliment(this.editingId, this.formData).subscribe({
        next: () => {
          this.fetchAliments();
          this.resetForm();
        },
        error: (err) => {
          this.error = 'Erreur lors de la sauvegarde';
        }
      });
    } else {
      this.alimentService.createAliment(this.formData).subscribe({
        next: () => {
          this.fetchAliments();
          this.resetForm();
        },
        error: (err) => {
          this.error = 'Erreur lors de la sauvegarde';
        }
      });
    }
  }

  handleEdit(aliment: Aliment): void {
    this.formData = { ...aliment };
    this.editingId = aliment.id || null;
    this.showForm = true;
    this.selectedAliment = null;
  }

  handleDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet aliment ?')) {
      this.alimentService.deleteAliment(id).subscribe({
        next: () => {
          this.fetchAliments();
          this.selectedAliment = null;
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression';
        }
      });
    }
  }

  resetForm(): void {
    this.formData = {
      nom: '',
      caloriesParPortion: 0,
      nutrimentsParPortion: ''
    };
    this.editingId = null;
    this.showForm = false;
  }

  selectAliment(aliment: Aliment): void {
    this.selectedAliment = aliment;
  }

  closeModal(): void {
    this.selectedAliment = null;
  }
  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('userRole');


    this.router.navigate(['/auth/login']);
  }

}

