import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CaloriesRecord {
  id?: number;
  mealName: string;
  calories: number;
  proteins: number;          // ajouté
  carbs: number;             // ajouté
  fat: number;               // ajouté
  ocrText: string;
  recommendations: string;   // ajouté
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class IaCaloriesService {
  private baseUrl = 'http://localhost:8084/api/calories'; // ton backend IA

  constructor(private http: HttpClient) {}

  calculateCalories(mealName: string, ocrText: string): Observable<CaloriesRecord> {

    return this.http.post<CaloriesRecord>(`${this.baseUrl}/calculate`, { mealName, ocrText });
  }
}
