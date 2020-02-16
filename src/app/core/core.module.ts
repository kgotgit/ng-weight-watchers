import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [TopToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[TopToolbarComponent,MaterialModule]
})

//Core module should not dependency with any other modules
export class CoreModule { }
