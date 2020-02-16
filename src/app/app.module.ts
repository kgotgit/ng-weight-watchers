import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';
import { CoreInjectorService } from './core/services/core-injector/core-injector.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpMockInterceptor } from './core/interceptor/http-mock.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    FeaturesModule

  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:HttpMockInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(injector:Injector){
    //used to create runtime instance of the services as needed for base classes.
    CoreInjectorService.injector=injector;
  }
}
