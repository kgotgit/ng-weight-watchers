import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CoreModule } from '../../core.module';
import { DebugElement, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreInjectorService } from '../../services/core-injector/core-injector.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let el: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule,BrowserAnimationsModule]
    })
      .compileComponents()
      .then(() => {
        CoreInjectorService.injector=TestBed.get(Injector);
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
