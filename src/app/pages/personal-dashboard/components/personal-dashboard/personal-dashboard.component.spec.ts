import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDashboardComponent } from './personal-dashboard.component';
import { PersonalDashboardModule } from '../../personal-dashboard.module';
import { DebugElement, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreInjectorService } from 'src/app/core/services/core-injector/core-injector.service';

describe('PersonalDashboardComponent', () => {
  let component: PersonalDashboardComponent;
  let fixture: ComponentFixture<PersonalDashboardComponent>;
  let el:DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PersonalDashboardModule,BrowserAnimationsModule]
    })
      .compileComponents()
      .then(() => {
        CoreInjectorService.injector=TestBed.get(Injector);
        fixture = TestBed.createComponent(PersonalDashboardComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
