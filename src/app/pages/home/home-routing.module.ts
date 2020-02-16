import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';




const childRoutes: Routes=[
  {
    path: "",
    component: HomeComponent,
  },
];
@NgModule({
  imports:[RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class HomeRoutingModule{}
