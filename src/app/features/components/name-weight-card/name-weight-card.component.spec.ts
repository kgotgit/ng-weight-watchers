import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameWeightCardComponent } from './name-weight-card.component';
import { DebugElement, Injector } from '@angular/core';
import { FeaturesModule } from '../../features.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CoreInjectorService } from 'src/app/core/services/core-injector/core-injector.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NameWeightCardComponent', () => {
  let component: NameWeightCardComponent;
  let fixture: ComponentFixture<NameWeightCardComponent>;
  let router:Router;
  let el:DebugElement;

 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesModule,BrowserAnimationsModule,RouterTestingModule.withRoutes([])],
    
    })
      .compileComponents()
      .then(() => {
        CoreInjectorService.injector=TestBed.get(Injector);
        router=TestBed.get(Router);
        fixture = TestBed.createComponent(NameWeightCardComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
