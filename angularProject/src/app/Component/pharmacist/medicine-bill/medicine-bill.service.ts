import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicineBill } from './medicine-bill.model';
import {ApiResponse} from "../../../util/api.response.model";
import { ConfigService } from '../../../util/config.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineBillService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getAllBills(): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/bills/`;
    return this.http.get<ApiResponse>(url);
  }

  getBillById(id: number): Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/bills/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  createBill(bill: MedicineBill)  : Observable<ApiResponse> {
    const url = `${this.configService.getApiBaseUrl()}/bills/create`;
    return this.http.post<ApiResponse>(url, bill);
  }

  updateBill(id: number, bill: MedicineBill): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}`, bill);
  }

  deleteBill(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
