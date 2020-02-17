import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CoreModule } from '../../core.module';
import { DebugElement, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreInjectorService } from '../../services/core-injector/core-injector.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router:Router;
  let el: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule,BrowserAnimationsModule,RouterTestingModule.withRoutes([]),HttpClientTestingModule],
  
    })
      .compileComponents()
      .then(() => {
        CoreInjectorService.injector=TestBed.get(Injector);
        fixture = TestBed.createComponent(LoginComponent);
        router=TestBed.get(router);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));

 /*  it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
