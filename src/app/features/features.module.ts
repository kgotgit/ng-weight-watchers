import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';




@NgModule({
  declarations: [ProfileFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  exports:[ProfileFormComponent]
})
export class FeaturesModule { }
