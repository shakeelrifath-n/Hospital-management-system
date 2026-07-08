import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {AppointmentModel} from "../../Component/receptionist/appointment/appointment.model";
import {Root} from "./appointmenthome.model";
import {ApiResponse} from "../../util/api.response.model";
import {ConfigService} from "../../util/config.service";

@Injectable({
  providedIn: 'root'
})
export class AppointmenthomeService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getDepartments(): Observable<any[]> {
    const url = `${this.configService.getApiBaseUrl()}/departments/`;
    return this.http.get<ApiResponse>(url).pipe(
      map(response => response.data?.departments ?? [])
    );
  }

  getDoctors(): Observable<any[]> {
    const url = `${this.configService.getApiBaseUrl()}/user/findUsersByRole?role=DOCTOR`;
    return this.http.get<ApiResponse>(url).pipe(
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
    const url = `${this.configService.getApiBaseUrl()}/appointments/save`;
    return this.http.post<any>(url, appointment);
  }
}
