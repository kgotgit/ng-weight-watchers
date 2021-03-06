import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { MaterialModule } from './material/material.module';
import { MessagesComponent } from './components/messages/messages.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TopToolbarComponent, MessagesComponent, LoginComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
 
    
  ],
  exports:[TopToolbarComponent,MaterialModule,LoginComponent,MessagesComponent]
})

//Core module should not dependency with any other modules
export class CoreModule { }
