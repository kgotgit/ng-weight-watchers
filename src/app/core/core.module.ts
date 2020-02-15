import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';



@NgModule({
  declarations: [TopToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[TopToolbarComponent]
})
export class CoreModule { }
