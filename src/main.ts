import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenStorageService } from './app/services/token-storage.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './app/services/http-interceptor.service';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    TokenStorageService,
    provideAnimations()
  ]
}).catch(err => console.error(err));
