import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessRequest, User } from './models';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/access-control/api';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  // Установка токена аутентификации
  setAuthToken(token: string) {
    this.tokenStorage.saveToken(token);
  }

  // Логин
  login(username: string, password: string): Observable<{ token: string }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { username, password }, { headers });
  }

  // Получение запросов
  getRequests(): Observable<{ requests: AccessRequest[]; ownerRequests: AccessRequest[]; adminRequests: AccessRequest[]; status?: string; user?: User }> {
    const headers = this.tokenStorage.getToken() ? new HttpHeaders().set('Authorization', `Bearer ${this.tokenStorage.getToken()}`) : new HttpHeaders();
    return this.http.get<{ requests: AccessRequest[]; ownerRequests: AccessRequest[]; adminRequests: AccessRequest[]; status?: string; user?: User }>(`${this.apiUrl}/requests`, { headers });
  }

  // Получение доступов
  getAccesses(): Observable<AccessRequest[]> {
    const headers = this.tokenStorage.getToken() ? new HttpHeaders().set('Authorization', `Bearer ${this.tokenStorage.getToken()}`) : new HttpHeaders();
    return this.http.get<AccessRequest[]>(`${this.apiUrl}/accesses`, { headers });
  }

  // Отправка заявки
  submitRequest(serviceId: number, roleId: number): Observable<string> {
    const headers = this.tokenStorage.getToken() ? new HttpHeaders().set('Authorization', `Bearer ${this.tokenStorage.getToken()}`).set('Content-Type', 'application/json') : new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(`${this.apiUrl}/auth/request-access`, { serviceId, roleId }, { headers });
  }
}
