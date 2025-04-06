import { Injectable } from '@angular/core';
import { User } from '@models/entity-interface';
import { UserService } from '@services/user/user.service';
import { Observable, of, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private userKey = 'user';

  constructor(private userService: UserService) {}

  login(email: string, password: string): Observable<User> {
    const userString = sessionStorage.getItem(this.userKey);
  
    if (userString) {
      const user = JSON.parse(userString) as User;
  
      if (user.email === email && user.password === password) {
        const fakeToken = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
        sessionStorage.setItem(this.tokenKey, fakeToken);
        return of(user);
      }
    } 
    
    return this.getUserByEmail(email);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.userService.getByEmail(email).pipe(
      switchMap((response) => {
        console.log('users: ', response);
  
        const matchedUser = response.content.find((u: User) => u.email === email);
        console.log('matchedUser: ', matchedUser);
  
        if (matchedUser) {
          return this.userService.getById(matchedUser.id).pipe(
            tap((fullUser) => {
              const fakeToken = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
              sessionStorage.setItem(this.tokenKey, fakeToken);
              sessionStorage.setItem(this.userKey, JSON.stringify(fullUser));
            })
          );
        } else {
          return throwError(() => new Error('Credenciais inválidas.'));
        }
      })
    );
  }


  register(user: Omit<User, 'password' | 'confirmPassword'>): Observable<Omit<User, 'password' | 'confirmPassword'>> {
    const fakeToken = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
    
    sessionStorage.setItem(this.tokenKey, fakeToken);
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
  
    return of(user);
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    sessionStorage.clear();
  }

  get token(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  get currentUser(): User | null {
    const raw = sessionStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }

  getUserKey(): string {
    return this.userKey;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }
}
