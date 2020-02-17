import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumbersonlyDirective } from './directives/numbersonly/numbersonly.directive';
import { CoreModule } from '../core/core.module';
import { ValidUsernameDirective } from './directives/valid-username/valid-username.directive';



@NgModule({
  declarations: [NumbersonlyDirective, ValidUsernameDirective],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports:[
   
    NumbersonlyDirective
  ]
})
export class SharedModule { }
