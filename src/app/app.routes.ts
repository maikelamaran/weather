import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/main-page/main-page.component').then(
        (m) => m.MainPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
