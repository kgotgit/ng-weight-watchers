import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NumbersonlyDirective } from './directives/numbersonly/numbersonly.directive';



@NgModule({
  declarations: [NumbersonlyDirective],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MaterialModule,
    NumbersonlyDirective
  ]
})
export class SharedModule { }
