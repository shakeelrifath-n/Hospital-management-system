import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentModel } from './department.model';
import {ApiResponse} from "../../../util/api.response.model";
import { ConfigService } from '../../../util/config.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getDepartments(): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/departments/`;
    return this.http.get<ApiResponse>(url);
  }

  getDepartmentById(id: number): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/departments/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  addDepartment(department: DepartmentModel): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/departments`;
    return this.http.post<ApiResponse>(url, department);
  }

  updateDepartment(id: number, department: DepartmentModel): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}`, department);
  }

  deleteDepartment(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
