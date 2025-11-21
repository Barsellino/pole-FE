import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'host',
    loadComponent: () =>
      import('./features/host/page/host').then(m => m.Host)
  },
  {
    path: 'display',
    loadComponent: () =>
      import('./features/display/page/display').then(m => m.Display)
  },

  { path: '', redirectTo: '/host', pathMatch: 'full' },
  { path: '**', redirectTo: '/host' }
];
