import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from './prescription.model';
import { ApiResponse } from '../../../util/api.response.model';
import { ConfigService } from '../../../util/config.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAllPrescriptions(): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/prescriptions`;
    return this.http.get<ApiResponse>(url);
  }

  getPrescriptionById(id: number): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/prescriptions/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  createPrescription(prescription: Prescription): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/prescriptions`;
    return this.http.post<ApiResponse>(url, prescription);
  }

  updatePrescription(id: number, prescription: Prescription): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/prescriptions/${id}`;
    return this.http.put<ApiResponse>(url, prescription);
  }

  deletePrescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPrescriptionsByDoctor(doctorId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  getPrescriptionsByPatient(patientId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/patient/${patientId}`);
  }

  getPrescriptionsByDate(date: Date): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/date?date=${date.toISOString()}`);
  }
}
