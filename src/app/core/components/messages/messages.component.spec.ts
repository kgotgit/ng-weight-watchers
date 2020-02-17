import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { DebugElement, Injector } from '@angular/core';
import { CoreModule } from '../../core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CoreInjectorService } from '../../services/core-injector/core-injector.service';
import { TopToolbarComponent } from '../top-toolbar/top-toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let el:DebugElement;
  let router:Router;

 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule,BrowserAnimationsModule,RouterTestingModule.withRoutes([])],
     
    })
      .compileComponents()
      .then(() => {
        CoreInjectorService.injector=TestBed.inject(Injector);
        fixture = TestBed.createComponent(MessagesComponent);
        router=TestBed.get(Router);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
