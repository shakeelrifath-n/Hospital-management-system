import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppointmentModel} from './appointment.model';
import {ApiResponse} from "../../../util/api.response.model";
import {ConfigService} from "../../../util/config.service";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient, private configService: ConfigService) {}

  createAppointment(appointment: AppointmentModel): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/appointments/save`;
    return this.httpClient.post<ApiResponse>(url, appointment);
  }

  getAllAppointments(): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/appointments/`;
    return this.httpClient.get<ApiResponse>(url);
  }

  getAppointmentById(id: number): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/appointments/${id}`;
    return this.httpClient.get<ApiResponse>(url);
  }

  updateAppointment(appointment: AppointmentModel): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/appointments/update`;
    return this.httpClient.put<ApiResponse>(url, appointment);
  }

  deleteAppointment(id: number): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/appointments/${id}`;
    return this.httpClient.delete<ApiResponse>(url);
  }

  getAppointmentsByUserId(userId: number): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/appointments/getAppointmentsByUserId`;
    return this.httpClient.get<ApiResponse>(url, {
      params: { userId: userId }
    });
  }

  getAppointmentsByDoctorId(doctorId: number): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/appointments/getAppointmentsByDoctorId`;
    return this.httpClient.get<ApiResponse>(url, {
      params: { doctorId: doctorId }
    });
  }
}
