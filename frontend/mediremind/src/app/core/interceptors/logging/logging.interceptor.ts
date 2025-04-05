import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`🛠️ [${req.method}] ${req.url}`);
  
  return next(req).pipe(
    tap(res => console.log(`✅ Resposta: `, res))
  );
};
