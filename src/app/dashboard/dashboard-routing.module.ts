import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {dashboardRoutes} from './dashboard.routing';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [AuthGuard]


  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class DashboardRoutingModule {
}
