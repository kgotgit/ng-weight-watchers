import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDashboardComponent } from './personal-dashboard.component';
import { PersonalDashboardModule } from '../../personal-dashboard.module';
import { DebugElement, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreInjectorService } from 'src/app/core/services/core-injector/core-injector.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('PersonalDashboardComponent', () => {
  let component: PersonalDashboardComponent;
  let fixture: ComponentFixture<PersonalDashboardComponent>;
  let el:DebugElement;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PersonalDashboardModule,BrowserAnimationsModule,RouterTestingModule.withRoutes([]),],
    
    })
      .compileComponents()
      .then(() => {
        CoreInjectorService.injector=TestBed.get(Injector);
        router = TestBed.get(Router);
        fixture = TestBed.createComponent(PersonalDashboardComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
