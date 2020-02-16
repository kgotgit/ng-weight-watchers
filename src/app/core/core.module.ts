import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { MaterialModule } from './material/material.module';
import { MessagesComponent } from './components/messages/messages.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [TopToolbarComponent, MessagesComponent, LoginComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[TopToolbarComponent,MaterialModule,LoginComponent]
})

//Core module should not dependency with any other modules
export class CoreModule { }
