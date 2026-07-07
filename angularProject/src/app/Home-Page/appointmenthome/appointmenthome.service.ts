import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {AppointmentModel} from "../../Component/receptionist/appointment/appointment.model";
import {Root} from "./appointmenthome.model";
import {ApiResponse} from "../../util/api.response.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmenthomeService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<any[]> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/departments/`).pipe(
      map(response => response.data?.departments ?? [])
    );
  }

  getDoctors(): Observable<any[]> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/user/findUsersByRole?role=DOCTOR`).pipe(
      map(response => response.data?.users ?? [])
    );
  }

  getDoctorsByDepartment(departmentId: string): Observable<any[]> {
    return this.getDoctors().pipe(
      map(doctors => {
        const filteredDoctors = doctors.filter((doctor: any) =>
          String(doctor.departmentId ?? doctor.department?.id ?? doctor.department?.departmentId ?? '') === String(departmentId)
        );

        return filteredDoctors.length > 0 ? filteredDoctors : doctors;
      })
    );
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/appointments/save`, appointment);
  }
}
