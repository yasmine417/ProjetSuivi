import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router} from '@angular/router';
import { CaloriesRecord, CaloriesRecordService } from '../../core/services/repas.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  today = new Date();
  loading = false;
  error: string | null = null;

  showForm = false;
  selectedRecord: CaloriesRecord | null = null;

  records: CaloriesRecord[] = [];

  constructor(private recordService: CaloriesRecordService ,private router: Router ) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.loading = true;
    this.error = null;

    this.recordService.getAllRecords().subscribe({
      next: (data) => {
        this.records = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = `Erreur de connexion: ${err.message}. Vérifiez que le backend IA est démarré sur le port correct.`;
        this.loading = false;
      }
    });
  }

  getTotalCalories(): number {
    return this.records.reduce((sum, r) => sum + Number(r.calories || 0), 0);
  }

  selectRecord(record: CaloriesRecord): void {
    this.selectedRecord = record;
  }

  closeModal(): void {
    this.selectedRecord = null;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('userRole');


    this.router.navigate(['/auth/login']);
  }

}
