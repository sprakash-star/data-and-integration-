import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'integrations', pathMatch: 'full' },
  {
    path: 'integrations',
    loadComponent: () => import('./integrations/integrations-list/integrations-list').then(m => m.IntegrationsList),
  },
  {
    path: 'integrations/:id',
    loadComponent: () => import('./integrations/integration-detail/integration-detail').then(m => m.IntegrationDetail),
  },
  { path: '**', redirectTo: 'integrations' },
];
