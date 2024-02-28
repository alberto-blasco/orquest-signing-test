import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { LoginPageComponent } from './core/pages/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./timesheet/timesheet.module').then(m => m.TimesheetModule),
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
