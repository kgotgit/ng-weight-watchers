import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopToolbarComponent } from './top-toolbar.component';
import { DebugElement, Injector } from '@angular/core';
import { CoreModule } from '../../core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CoreInjectorService } from '../../services/core-injector/core-injector.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TopToolbarComponent', () => {
  let component: TopToolbarComponent;
  let fixture: ComponentFixture<TopToolbarComponent>;
  let el:DebugElement;
  let router:Router;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule,BrowserAnimationsModule,RouterTestingModule.withRoutes([])],
     
    })
      .compileComponents()
      .then(() => {
        CoreInjectorService.injector=TestBed.get(Injector);
        fixture = TestBed.createComponent(TopToolbarComponent);
        router = TestBed.get(Router);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
