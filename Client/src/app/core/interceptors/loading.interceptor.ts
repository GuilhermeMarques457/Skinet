import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';
import { inject } from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  if (!req.url.includes('email-exists')) busyService.busy();

  return next(req).pipe(
    delay(500),
    finalize(() => busyService.idle())
  );
};
