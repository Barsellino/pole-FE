import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiError } from '../../shared';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError: ApiError = {
        message: error.error?.message || error.message || 'Невідома помилка',
        code: error.error?.code,
        status: error.status
      };

      console.error('HTTP Error:', apiError);
      return throwError(() => apiError);
    })
  );
};
