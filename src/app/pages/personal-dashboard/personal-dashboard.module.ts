import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDashboardComponent } from './components/personal-dashboard/personal-dashboard.component';
import { PersonalDashboardRoutingModule } from './personal-dashboard-routing.module';



@NgModule({
  declarations: [PersonalDashboardComponent],
  imports: [
    CommonModule,
    PersonalDashboardRoutingModule,
  ]
})
export class PersonalDashboardModule { }
