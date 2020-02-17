import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DebugElement, Injector } from '@angular/core';
import { HomeModule } from '../../home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreInjectorService } from 'src/app/core/services/core-injector/core-injector.service';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let el:DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HomeModule,BrowserAnimationsModule],
      providers:[Router]
    })
      .compileComponents()
      .then(() => {
        CoreInjectorService.injector=TestBed.get(Injector);
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
