import { NgModule} from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './core/components/login/login.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';


const routes: Routes = [
 
  {
    path: "pages/login",
    component: LoginComponent,
  },
  
  {
    path: "pages/home",
    loadChildren:()=>import('./pages/home/home.module').then(mod=>mod.HomeModule)
  },
  {
    path: "pages/dashboard",
    loadChildren:()=>import('./pages/personal-dashboard/personal-dashboard.module').then(mod=>mod.PersonalDashboardModule)
  },
  { path: "", redirectTo: "pages/login", pathMatch: "full" },
  { path: "**", component:PageNotFoundComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
