import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OcrRequest {
  mealName: string;
  ocrText: string;
}

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  private apiUrl = 'http://localhost:8082/api/ocr';

  constructor(private http: HttpClient) {}

  sendOcr(data: OcrRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/send`, data, {
      responseType: 'text'
    });
  }
}
