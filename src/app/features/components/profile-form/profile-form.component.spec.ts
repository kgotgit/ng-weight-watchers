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

  it("check mode: edit=> Save button found.", () => {

    component.mode = "edit";
    fixture.detectChanges();

    const btn = el.queryAll(By.css("#save-btn"));
    
    expect(btn).toBeTruthy("Save button is not found");

    expect(btn.length).toEqual(1,"Save button is not found or more than one exists");

  });


  it("check mode: edit=> Input fields[name,age,weight] are enabled", () => {

    component.mode = "edit";
    fixture.detectChanges();

    const namefield:DebugElement = el.query(By.css("input[formcontrolname='name'][disabled]"));
        
    expect(namefield).toBeNull("Name field are found disabled");  

    const ageField:DebugElement = el.query(By.css("input[formcontrolname='age'][disabled]"));
        
    expect(ageField).toBeNull("Age field are found disabled");  

    const weightField:DebugElement = el.query(By.css("input[formcontrolname='weight'][disabled]"));
        
    expect(weightField).toBeNull("Weight field are found disabled");  

  });




  it("check mode: readonly=> Input fields[name,age,weight] are disabled", () => {

    component.mode = "readonly";
    fixture.detectChanges();

    const namefield:DebugElement = el.query(By.css("input[formcontrolname='name'][disabled]"));
        
    expect(namefield).toBeTruthy("Name field is found enabled"); 

    const ageField:DebugElement = el.query(By.css("input[formcontrolname='age'][disabled]"));
        
    expect(namefield).toBeTruthy("Age field is found enabled");

    const weightField:DebugElement = el.query(By.css("input[formcontrolname='weight'][disabled]"));
        
    expect(namefield).toBeTruthy("Weight field is found enabled");

  });

  it("Last Updated field is readonly in both modes [Edit, Readonly]",()=>{
    
    component.mode = "readonly";
    fixture.detectChanges();
    
    const lastInReadonly:DebugElement = el.query(By.css("input[formcontrolname='lastUpdated'][readonly]"));

    expect(lastInReadonly).toBeTruthy("Last Updated is not found or is enabled in readonly mode"); 

    component.mode = "edit";
    fixture.detectChanges();


    const lastInEdit:DebugElement = el.query(By.css("input[formcontrolname='lastUpdated'][readonly]"));

    expect(lastInEdit).toBeTruthy("Last Updated is not found or is enabled in edit mode"); 

  });


  
  it("check mode: readonly=> edit button Exits", () => {

    component.mode = "readonly";
    fixture.detectChanges();

    const btn = el.queryAll(By.css("#edit-btn"));
    
    expect(btn).toBeTruthy("Required action buttons were not found");

    expect(btn.length).toEqual(1,"edit button is not found or more than one exists");

  });



});
