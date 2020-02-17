import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartComponent } from './line-chart.component';
import { DebugElement, Injector } from '@angular/core';
import { FeaturesModule } from '../../features.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreInjectorService } from 'src/app/core/services/core-injector/core-injector.service';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;
  let el: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesModule,BrowserAnimationsModule]
    })
      .compileComponents()
      .then(() => {
        CoreInjectorService.injector=TestBed.get(Injector);
        fixture = TestBed.createComponent(LineChartComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
