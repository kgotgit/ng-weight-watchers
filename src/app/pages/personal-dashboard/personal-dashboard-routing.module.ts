import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PersonalDashboardComponent } from './components/personal-dashboard/personal-dashboard.component';




const childRoutes: Routes=[
  {
    path: ":id",
    component: PersonalDashboardComponent,
  },
];
@NgModule({
  imports:[RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class PersonalDashboardRoutingModule{}
