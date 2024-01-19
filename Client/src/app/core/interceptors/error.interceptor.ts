import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private router: Router, private toastr: ToastrService) {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     console.log('entrou interceptor');
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error) {
//           switch (error.status) {
//             case 400:
//               // If it's a validation error
//               if (error.error.errors) throw error.error;
//               else
//                 this.toastr.error(error.error.message, error.status.toString());
//               break;
//             case 401:
//               this.toastr.error(error.error.message, error.status.toString());
//               break;
//             case 404:
//               this.router.navigateByUrl('/not-found');
//               break;
//             case 500:
//               const navigationExtras: NavigationExtras = {
//                 state: { error: error.error },
//               };
//               this.router.navigateByUrl('/server-error', navigationExtras);
//               break;
//           }
//         }

//         return throwError(() => new Error(error.message));
//       })
//     );
//   }
// }

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status) {
          case 400:
            // If it's a validation error
            if (error.error.errors) throw error.error;
            else toastr.error(error.error.message, error.status.toString());
            break;
          case 401:
            toastr.error(error.error.message, error.status.toString());
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
        }

        return throwError(() => new Error(error.message));
      }

      return throwError(() => new Error('An unknow error occorred'));
    })
  );
};
