import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { authInterceptor } from './core/services/auth/authInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
  provideAnimations(),
   providePrimeNG({
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false  // <-- ajoute/modifie cette ligne
    }
  }
}),

    provideHttpClient(
      withFetch(),                    // requis pour SSR/hydration
      withInterceptors([authInterceptor])  // intercepteur fonctionnel
    ),
    
  ]
};
