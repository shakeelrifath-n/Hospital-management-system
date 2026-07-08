import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceptionistProfileModel } from './receptionistprofile.model';
import { Observable } from 'rxjs';
import { ConfigService } from '../../util/config.service';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistprofileService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getProfile(): Observable<ReceptionistProfileModel> {
    const url = this.configService.getApiBaseUrl() + '/user/profile';
    return this.http.get<ReceptionistProfileModel>(url);
  }

  updateProfile(profile: ReceptionistProfileModel): Observable<ReceptionistProfileModel> {
    const url = this.configService.getApiBaseUrl() + '/user/profile';
    return this.http.put<ReceptionistProfileModel>(url, profile);
  }
}
