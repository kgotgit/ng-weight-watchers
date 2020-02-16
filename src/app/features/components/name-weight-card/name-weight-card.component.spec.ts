import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameWeightCardComponent } from './name-weight-card.component';

describe('NameWeightCardComponent', () => {
  let component: NameWeightCardComponent;
  let fixture: ComponentFixture<NameWeightCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameWeightCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameWeightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
