import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Requests } from './requests/requests';
import { Accesses } from './accesses/accesses';
import { RequestAccess } from './request-access/request-access';
import { RequestEdit } from './request-edit/request-edit';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'requests', component: Requests },
  { path: 'accesses', component: Accesses },
  { path: 'request-access', component: RequestAccess },
  { path: 'request-edit', component: RequestEdit },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
