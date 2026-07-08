import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../test/test.model';
import { ConfigService } from '../../../util/config.service';

@Injectable({
  providedIn: 'root',
})
export class TestService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAllTests(): Observable<any> {
    const url = `${this.configService.getApiBaseUrl()}/tests`;
    return this.http.get<any>(url);
  }

  getTestById(id: number): Observable<any> {
    const url = `${this.configService.getApiBaseUrl()}/tests/${id}`;
  }

  createTest(test: Test): Observable<any> {
    return this.http.post<any>(this.baseUrl, test);
  }

  updateTest(id: number, test: Test): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, test);
  }

  deleteTest(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
