import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './user.model';
import { ApiResponse } from '../util/api.response.model';
import { StorageUtil } from '../util/storage.util';
import { ConfigService } from '../util/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  private getAuthHeaders(): HttpHeaders {
    const jwt = StorageUtil.getFromLocalStorage('jwt');
    return new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
  }

  findAllUsers(): Observable<ApiResponse> {
    const url = this.configService.getApiBaseUrl() + '/user/findAllUsers';
    return this.http.get<ApiResponse>(url, { headers: this.getAuthHeaders() });
  }

  findUsersByRole(role: string): Observable<ApiResponse> {
    const url = this.configService.getApiBaseUrl() + '/user/findUsersByRole?role=' + role;
    return this.http.get<ApiResponse>(url);
  }

  findById(id: any): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/user/findById/${id}`;
    return this.http.get<ApiResponse>(url, { headers: this.getAuthHeaders() });
  }

  saveUser(user: UserModel, imageFile?: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));

    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    console.log(formData)
    const url = this.configService.getApiBaseUrl() + '/user/saveUser';
    return this.http.post<ApiResponse>(url, formData, { headers: this.getAuthHeaders() });
  }

  updateUser(user: UserModel, imageFile?: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));

    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    const url = this.configService.getApiBaseUrl() + '/user/updateUser';
    return this.http.put<ApiResponse>(url, formData, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: number): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/user/deleteById/${id}`;
    return this.http.delete<ApiResponse>(url, { headers: this.getAuthHeaders() });
  }
}
