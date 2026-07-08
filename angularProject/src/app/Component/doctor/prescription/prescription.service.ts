import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from './prescription.model';
import { ApiResponse } from '../../../util/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private apiUrl = '/api/prescriptions'; 

  constructor(private http: HttpClient) {}

  getAllPrescriptions(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  getPrescriptionById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  createPrescription(prescription: Prescription): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, prescription);
  }

  updatePrescription(id: number, prescription: Prescription): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}`, prescription);
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
