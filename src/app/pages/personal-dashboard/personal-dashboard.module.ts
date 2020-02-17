import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDashboardComponent } from './components/personal-dashboard/personal-dashboard.component';
import { PersonalDashboardRoutingModule } from './personal-dashboard-routing.module';
import { FeaturesModule } from 'src/app/features/features.module';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PersonalDashboardComponent],
  imports: [
    CommonModule,
    PersonalDashboardRoutingModule,
    FeaturesModule,
    CoreModule,
    RouterModule,
  ]
})
export class PersonalDashboardModule { }
