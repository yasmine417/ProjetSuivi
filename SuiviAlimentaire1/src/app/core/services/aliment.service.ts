import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aliment {
  id?: number;
  nom: string;
  caloriesParPortion: number;
  nutrimentsParPortion: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlimentService {
  private apiUrl = 'http://localhost:8081/api/aliments';

  constructor(private http: HttpClient) { }

  getAllAliments(): Observable<Aliment[]> {
    return this.http.get<Aliment[]>(this.apiUrl);
  }

  getAlimentById(id: number): Observable<Aliment> {
    return this.http.get<Aliment>(`${this.apiUrl}/${id}`);
  }

  createAliment(aliment: Aliment): Observable<Aliment> {
    return this.http.post<Aliment>(this.apiUrl, aliment);
  }

  updateAliment(id: number, aliment: Aliment): Observable<Aliment> {
    return this.http.put<Aliment>(`${this.apiUrl}/${id}`, aliment);
  }

  deleteAliment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
