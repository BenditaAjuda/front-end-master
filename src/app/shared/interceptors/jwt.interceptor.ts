import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { ContaService } from 'src/app/conta/conta.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private contaservice: ContaService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.contaservice.user$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          // Clone from the coming request and add Authorization header to that
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.jwt}`
            }
          });
        }
      }
    })
    return next.handle(request);
  }

}
