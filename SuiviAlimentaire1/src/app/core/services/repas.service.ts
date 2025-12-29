import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CaloriesRecord {
  id?: number;
  mealName: string;
  calories: number;
  proteins: number;
  carbs: number;
  fat: number;
  ocrText: string;
  createdAt: string;
  recommendations: string;
}

@Injectable({
  providedIn: 'root'
})
export class CaloriesRecordService {
  private apiUrl = 'http://localhost:8083/api/calories-history'; // microservice IA

  constructor(private http: HttpClient) {}

  getAllRecords(): Observable<CaloriesRecord[]> {
    return this.http.get<CaloriesRecord[]>(this.apiUrl);
  }
}
