import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';




@NgModule({
  declarations: [ProfileFormComponent],
  imports: [
    CommonModule
  ],
  exports:[ProfileFormComponent]
})
export class FeaturesModule { }
