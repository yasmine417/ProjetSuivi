import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // pour le pipe date
import { IaCaloriesService, CaloriesRecord } from '../../core/services/ia-calories.service';
import { JsonToArrayPipe } from '../../core/pipes/json-to-array.pipe';

import { Router } from '@angular/router';


@Component({
  selector: 'app-ia-calories',
  standalone: true,
  imports: [CommonModule, DatePipe, JsonToArrayPipe],
  templateUrl: './ia-calories.component.html',
  styleUrls: ['./ia-calories.component.scss']
})
export class IaCaloriesComponent {

  record: CaloriesRecord | null = null;  // seul le repas envoyé
  loading = true;
  error = '';

  constructor(private iaService: IaCaloriesService, private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as { mealName: string, ocrText: string };

    if (state && state.mealName && state.ocrText) {
      this.calculateCalories(state.mealName, state.ocrText);
    } else {
      this.error = 'Aucun repas à calculer';
      this.loading = false;
    }
  }

  calculateCalories(mealName: string, ocrText: string) {
    this.loading = true;
    this.iaService.calculateCalories(mealName, ocrText).subscribe({
      next: data => {
        this.record = data;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Erreur calcul calories IA';
        this.loading = false;
      }
    });
  }
}
