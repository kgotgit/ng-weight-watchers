import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from 'src/app/core/guards/auth-guard/auth-guard.service';




const childRoutes: Routes=[
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuardService] 
  }
];
@NgModule({
  imports:[RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class HomeRoutingModule{}
