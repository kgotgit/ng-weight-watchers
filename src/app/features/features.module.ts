import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [ProfileFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  exports:[ProfileFormComponent]
})
export class FeaturesModule { }
