import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from './report.model';
import { ApiResponse } from '../../../util/api.response.model';
import { ConfigService } from '../../../util/config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getReports(): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/reports`;
    return this.http.get<ApiResponse>(url);
  }


  getById(id: string): Observable<any> {
    const url = `${this.configService.getApiBaseUrl()}/reports/${id}`;
    return this.http.get(url);

  }


  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.baseUrl}/${id}`);
  }

  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.baseUrl, report, this.httpOptions);
  }

  updateReport(report: Report): Observable<Report> {
    return this.http.put<Report>(`${this.baseUrl}/${report.id}`, report, this.httpOptions);
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
