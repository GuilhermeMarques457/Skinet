import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../../account/account.service';
import { inject } from '@angular/core';
import { take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  let token: string | null = localStorage.getItem('token');

  // accountService.currentUser$.pipe(take(1)).subscribe({
  //   next: (data) => {
  //     token = data?.token;
  //   },
  // });

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
