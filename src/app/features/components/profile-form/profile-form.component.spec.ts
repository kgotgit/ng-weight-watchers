import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormComponent } from './profile-form.component';
import { DebugElement } from '@angular/core';
import { FeaturesModule } from '../../features.module';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;
  let el: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesModule,BrowserAnimationsModule]
    })
      .compileComponents()
      .then(() => {

        fixture = TestBed.createComponent(ProfileFormComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it("check mode: edit=> check if no# of action buttons are two [edit/add profile pic and save]", () => {

    component.mode = "edit";
    fixture.detectChanges();

    const btn = el.queryAll(By.css("button"));
    expect(btn).toBeTruthy("Required action buttons were not found");

    expect(btn.length).toEqual(2,"Required Number of action buttons not found");


  });

  it("check mode: edit=> Save button Exits", () => {

    component.mode = "edit";
    fixture.detectChanges();

    const btn = el.queryAll(By.css("#save-btn"));
    
    expect(btn).toBeTruthy("Required action buttons were not found");

    expect(btn.length).toEqual(1,"Save button is not found or more than one exists");

  });


  
  it("check mode: readonly=> edit button Exits", () => {

    component.mode = "readonly";
    fixture.detectChanges();

    const btn = el.queryAll(By.css("#edit-btn"));
    
    expect(btn).toBeTruthy("Required action buttons were not found");

    expect(btn.length).toEqual(1,"edit button is not found or more than one exists");

  });



});
