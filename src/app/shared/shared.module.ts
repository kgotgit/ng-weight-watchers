import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumbersonlyDirective } from './directives/numbersonly/numbersonly.directive';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [NumbersonlyDirective],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports:[
   
    NumbersonlyDirective
  ]
})
export class SharedModule { }
