import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {StorageUtil} from "../../util/storage.util";
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = StorageUtil.getFromLocalStorage('jwt');
    const isPublicRequest =
      req.url.includes('/api/auth/login') ||
      req.url.includes('/api/user/saveUser') ||
      req.url.includes('/api/departments') ||
      req.url.includes('/api/user/findUsersByRole') ||
      req.url.includes('/api/appointments/save');

    if (jwt && !isPublicRequest) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwt}`)
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
