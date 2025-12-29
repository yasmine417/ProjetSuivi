import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // LOGIN - Sans le champ role
  login(data: LoginRequest): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      data,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      tap(response => {
        // Récupérer le token depuis le header
        const token = response.headers.get('Authorization');
        if (token) {
          this.saveToken(token);
          this.saveRoleFromToken(token);
        }

        // Récupérer le token et le rôle depuis le body
        if (response.body?.token) {
          const fullToken = 'Bearer ' + response.body.token;
          this.saveToken(fullToken);
          this.saveRoleFromToken(fullToken);
        }

        if (response.body?.role) {
          localStorage.setItem('userRole', response.body.role);
        }
      })
    );
  }

  // REGISTER
  register(data: RegisterRequest): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/register`,
      data,
      {
        responseType: 'text',
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }


  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  saveRoleFromToken(token: string): void {
    try {
      const tokenWithoutBearer = token.replace('Bearer ', '').trim();
      const decoded: JwtPayload = jwtDecode(tokenWithoutBearer);
      if (decoded.role) {
        localStorage.setItem('userRole', decoded.role);
      }
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
    }
  }


  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }


  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }


  isUser(): boolean {
    return this.getUserRole() === 'USER';
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': token } : {})
    });
  }
}
