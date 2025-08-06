import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessRequest, RequestAccessFormData } from '../models';

interface RequestsViewResponse {
  userRequests: AccessRequest[];
  ownerApprovalRequests: AccessRequest[];
  adminApprovalRequests: AccessRequest[];
  currentUser: any;
}

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(private http: HttpClient) {}

  getRequests(): Observable<RequestsViewResponse> {
    return this.http.get<RequestsViewResponse>(`/api/requests`);
  }

  getAccesses(): Observable<AccessRequest[]> {
    return this.http.get<AccessRequest[]>(`/api/accesses`);
  }

  submitRequest(serviceId: number, roleId: number): Observable<AccessRequest> {
    return this.http.post<AccessRequest>(`/api/requests?serviceId=${serviceId}&roleId=${roleId}`, {});
  }

  getRequestAccessForm(): Observable<RequestAccessFormData> {
    return this.http.get<RequestAccessFormData>(`/api/auth/request-access-form`);
  }

  approveRequest(requestId: number): Observable<string> {
    return this.http.post(`/api/requests/approve?requestId=${requestId}`, {}, { responseType: 'text' });
  }

  rejectRequest(requestId: number): Observable<string> {
    return this.http.post(`/api/requests/reject?requestId=${requestId}`, {}, { responseType: 'text' });
  }

  adminApproveRequest(requestId: number): Observable<string> {
    return this.http.post(`/api/requests/admin/approve?requestId=${requestId}`, {}, { responseType: 'text' });
  }

  adminRejectRequest(requestId: number): Observable<string> {
    return this.http.post(`/api/requests/admin/reject?requestId=${requestId}`, {}, { responseType: 'text' });
  }

  getRequestById(id: number): Observable<AccessRequest> {
    return this.http.get<AccessRequest>(`/api/requests/${id}`);
  }

  updateRequest(id: number, serviceId: number, roleId: number): Observable<AccessRequest> {
    return this.http.put<AccessRequest>(`/api/requests/${id}`, { serviceId, roleId });
  }
}
