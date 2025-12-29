import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IaResult {
  mealName: string;
  ocrText: string;
  calories: number;
  suggestions: string[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class OcrIaService {

  private ocrUrl = 'http://localhost:8082/api/ocr/upload';

  private iaUrl = 'http://localhost:8084/api/calories';

  constructor(private http: HttpClient) {}


  uploadImage(file: File): Observable<{mealName: string, ocrText: string}> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{mealName: string, ocrText: string}>(this.ocrUrl, formData);
  }


  calculateCalories(mealName: string, ocrText: string): Observable<IaResult> {
    return this.http.post<IaResult>(this.iaUrl, { mealName, ocrText });
  }
}
