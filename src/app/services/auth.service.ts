import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.tokenStorage.getToken());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  //Метод отправляет данные на бэкенд и сохраняет полученный JWT-токен
  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', { username, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.tokenStorage.saveToken(response.token);
            this.isAuthenticatedSubject.next(true);
          }
        }),
        catchError(error => {
          this.isAuthenticatedSubject.next(false);
          return throwError(() => new Error('Login failed: ' + (error.status === 401 ? 'Invalid credentials' : error.message)));
        })
      );
  }

  //Метод удаляет токен
  logout(): void {
    this.tokenStorage.clearToken();
    this.isAuthenticatedSubject.next(false);
  }
}
