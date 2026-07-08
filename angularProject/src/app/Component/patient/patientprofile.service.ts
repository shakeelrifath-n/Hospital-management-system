import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientProfileModel } from './patientprofile.model';
import { Observable } from 'rxjs';
import { ConfigService } from '../../util/config.service';

@Injectable({
  providedIn: 'root'
})
export class PatientprofileService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getProfile(): Observable<PatientProfileModel> {
    const url = this.configService.getApiBaseUrl() + '/user/profile';
    return this.http.get<PatientProfileModel>(url);
  }

  updateProfile(profile: PatientProfileModel): Observable<PatientProfileModel> {
    const url = this.configService.getApiBaseUrl() + '/user/profile';
    return this.http.put<PatientProfileModel>(url, profile);
  }
}
