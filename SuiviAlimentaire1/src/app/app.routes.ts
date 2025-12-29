import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  {
    path: 'auth',
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) }
    ]
  },

  {
    path: 'user',
    canActivate: [roleGuard],
    data: { roles: ['USER'] },
    children: [
      { path: 'ocr', loadComponent: () => import('./features/ocr/ocr.component').then(m => m.OcrComponent) },
      { path: 'ia-calories', loadComponent: () => import('./features/ia/ia-calories.component').then(m => m.IaCaloriesComponent) },
      { path: 'aliments', loadComponent: () => import('./features/aliments/aliments.component').then(m => m.AlimentsComponent), data: { roles: ['USER', 'ADMIN'] } },
      { path: 'history', loadComponent: () => import('./features/history/history.component').then(m => m.HistoryComponent), data: { roles: ['USER', 'ADMIN'] } }
    ]
  },

  {
    path: 'admin',
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
       { path: 'aliments', loadComponent: () => import('./features/aliments/aliments.component').then(m => m.AlimentsComponent) },
      { path: 'history', loadComponent: () => import('./features/history/history.component').then(m => m.HistoryComponent) }
    ]
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];
