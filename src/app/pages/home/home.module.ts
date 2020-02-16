import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FeaturesModule } from 'src/app/features/features.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FeaturesModule,
    CoreModule,
  ]
})
export class HomeModule { }
