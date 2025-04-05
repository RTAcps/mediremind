import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginResponse, User } from '@models/entity-interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private userKey = 'user';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>('/api/login', { email, password }).pipe(
      tap(({ token, user }) => {
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.userKey, JSON.stringify(user));
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get currentUser(): User | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }
}
