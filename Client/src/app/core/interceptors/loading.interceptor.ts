import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize, identity } from 'rxjs';
import { BusyService } from '../services/busy.service';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  if (
    req.url.includes('email-exists') ||
    (req.method === 'POST' && req.url.includes('Orders'))
  ) {
    return next(req);
  }

  busyService.busy();

  return next(req).pipe(
    environment.production ? identity : delay(500),
    finalize(() => busyService.idle())
  );
};
