import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopToolbarComponent } from './top-toolbar.component';
import { DebugElement } from '@angular/core';
import { CoreModule } from '../../core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TopToolbarComponent', () => {
  let component: TopToolbarComponent;
  let fixture: ComponentFixture<TopToolbarComponent>;
  let el:DebugElement;

 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule,BrowserAnimationsModule]
    })
      .compileComponents()
      .then(() => {

        fixture = TestBed.createComponent(TopToolbarComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TopToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
