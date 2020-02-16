import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { NameWeightCardComponent } from './components/name-weight-card/name-weight-card.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [ProfileFormComponent, NameWeightCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    RouterModule,
  ],
  exports:[ProfileFormComponent,NameWeightCardComponent]
})
export class FeaturesModule { }
