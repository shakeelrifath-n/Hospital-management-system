import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NurseProfileModel } from './nurseprofile.model';
import { Observable } from 'rxjs';
import { ConfigService } from '../../util/config.service';

@Injectable({
  providedIn: 'root'
})
export class NurseprofileService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getProfile(): Observable<NurseProfileModel> {
    const url = this.configService.getApiBaseUrl() + '/user/profile';
    return this.http.get<NurseProfileModel>(url);
  }

  updateProfile(profile: NurseProfileModel): Observable<NurseProfileModel> {
    const url = this.configService.getApiBaseUrl() + '/user/profile';
    return this.http.put<NurseProfileModel>(url, profile);
  }
}
