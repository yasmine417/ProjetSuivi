import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// Interceptor JWT
export const tokenInterceptor = (req: any, next: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),                 // ✅ routes complètes
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ]
}).catch(err => console.error(err));
