import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError(err => {
      let errorMsg = 'Erro desconhecido. Tente novamente mais tarde.';

      if (err.status === 401) {
        errorMsg = 'Sessão expirada. Faça login novamente.';
        router.navigate(['/login']);
      } else if (err.status === 403) {
        errorMsg = 'Você não tem permissão para acessar este recurso.';
      } else if (err.status >= 400 && (err.status !== 401 || err.status !== 403)) {
        errorMsg = 'Houve um erro no sistema, contate o administrador.';
      } else if (err.status >= 500) {
        errorMsg = 'Erro no servidor. Por favor, tente mais tarde.';
      } else {
        errorMsg;
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
      return throwError(() => err);
    })
  );
};
