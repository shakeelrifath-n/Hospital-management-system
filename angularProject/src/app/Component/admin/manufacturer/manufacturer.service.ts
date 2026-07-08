import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manufacturer } from './manufacturer.model';
import {ApiResponse} from "../../../util/api.response.model";
import { ConfigService } from '../../../util/config.service';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getManufacturers(): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/manufacturers/`;
    return this.http.get<ApiResponse>(url);
  }

  getManufacturerById(id: number): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/manufacturers/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  createManufacturer(manufacturer: Manufacturer): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/manufacturers`;
    return this.http.post<ApiResponse>(url, manufacturer);
  }

  updateManufacturer(id: number, manufacturer: Manufacturer): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}`, manufacturer);
  }

  deleteManufacturer(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
