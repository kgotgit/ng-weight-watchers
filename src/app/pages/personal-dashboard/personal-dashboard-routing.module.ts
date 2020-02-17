import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PersonalDashboardComponent } from './components/personal-dashboard/personal-dashboard.component';
import { AuthGuardService } from 'src/app/core/guards/auth-guard/auth-guard.service';




const childRoutes: Routes=[
  {
    path: ":id",
    component: PersonalDashboardComponent,
    canActivate: [AuthGuardService] 
  },
];
@NgModule({
  imports:[RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class PersonalDashboardRoutingModule{}
