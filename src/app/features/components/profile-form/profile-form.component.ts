import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPersonDetails } from '../../models/person-details.interface';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { NumbersonlyDirective } from 'src/app/shared/directives/numbersonly/numbersonly.directive';
import { BaseComponent } from 'src/app/core/abstract-base/base.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { IWeightHistory } from '../../models/weight-history.interface';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent extends BaseComponent {

  //form controls for a given form
  _profileForm:FormGroup;
  //person details including weight history
  _personDetails:IPersonDetails;
  
  
 

  //mode to determine edit or readonly
  @Input() mode:'edit'|'readonly'='edit';


  //emit data changed
  @Output() dataChanged=new EventEmitter<IPersonDetails>();
   
  //local variable to hold profile picture image data url
  _imgSrc:string;

  constructor(private fb:FormBuilder,
    private domSanitzer:DomSanitizer,
    private datePipe:DatePipe) {
    super();
   }

   @Input()
   set personDetails(personDetails:IPersonDetails){
    this._personDetails=personDetails;
    //need to update the form control with values as there is a possibility formGroup is already initiated.
    this.updateFormGroup();
   }

  ngOnInit(): void {
    this.createFormGroup();
  }


  /**
   * Create the reative form group object
   * lastUpdated is always disabled. (readonly)
   */
  createFormGroup():void{
    this._profileForm=this.fb.group({
      name:new FormControl({value:(this.hasValue(this.personDetails) && this.hasValue(this.personDetails.name))?this.personDetails.name:"",disabled:this.checkForMode()},[Validators.required,Validators.maxLength(100)]),
      age:new FormControl({value:(this.hasValue(this.personDetails) && this.hasValue(this.personDetails.age))?this.personDetails.age:"",disabled:this.checkForMode()},[NumbersonlyDirective.validateNumbersOnly,Validators.maxLength(3)]),
      weight:new FormControl({value:(this.hasValue(this.personDetails) && this.hasValue(this.personDetails.weight))?this.personDetails.weight:"",disabled:this.checkForMode()},[NumbersonlyDirective.validateNumbersOnly,Validators.maxLength(3)]),
      lastUpdated:new FormControl({value:(this.hasValue(this.personDetails) && this.hasValue(this.personDetails.lastUpdated))?this.personDetails.lastUpdated:"",disabled:true},[]),
      imgSrc: new FormControl({value:(this.hasValue(this.personDetails) && this.hasValue(this.personDetails.imgSrc))?this.personDetails.imgSrc:"",disabled:false},[])
    });
  }

  /**
   * 
   */
  updateFormGroup(){
    if(this.hasValue(this._personDetails)){
      this._profileForm.controls.name.setValue(this._personDetails.name);
      this._profileForm.controls.age.setValue(this._personDetails.age);
      this._profileForm.controls.weight.setValue(this._personDetails.weight);
      this._profileForm.controls.lastUpdated.setValue(this._personDetails.lastUpdated);
      this._imgSrc=this._personDetails.imgSrc+"";
    }
  }

  /**
   * utility to get formcontrols from formGroup object
   */
  get formControl(){
    return this._profileForm.controls;
  }
  /**
   * To determine the current state of the form
   * if mode=='readonly' returns true else false
   */
  checkForMode(){
    return this.mode==='readonly'?true:false;
  }


  /**
   * Convert uploaded file to image data url;
   * @param $event 
   */
  onFileInput($event){
    if($event.target.files.length>0){
      let fileReader=new FileReader();
      const [file]=$event.target.files;
      fileReader.readAsDataURL(file);
      fileReader.onload=()=>{
        this._imgSrc=fileReader.result as string;
        this._profileForm.patchValue({
          imgSrc:fileReader.result as string
        });
      }
    }
  }

  /**
   * change the form mode to edit
   * 
   */
  onEdit(){
    this.mode="edit";
    this.changeFieldState();

  }

  /**
   * Save data via service and change the mode to readonly
   */
  onSave(){
    this.mode="readonly";
    this.changeFieldState();
    this._personDetails.name=this._profileForm.controls.name.value;
    this._personDetails.age=this._profileForm.controls.age.value;
    
    let weight=this._profileForm.controls.weight.value;
    //if weight value is changed then update the history object
    if(weight!=this._personDetails.weight){
      let lastUpdated:string=this.datePipe.transform(new Date(),"MM/dd/yyyy");
      let historyData:IWeightHistory=new Object() as IWeightHistory;
      historyData.weight=weight;
      historyData.lastUpdated=lastUpdated;
      this._profileForm.controls.lastUpdated.setValue(lastUpdated);
      this._personDetails.weight=weight;
      this._personDetails.lastUpdated=lastUpdated;
      let weights:IWeightHistory[]=this.isValidArrayWithData(this._personDetails.history)?this._personDetails.history:new Array() as IWeightHistory[];
      let filterItem=weights.filter((iw:IWeightHistory)=>{return iw.lastUpdated===lastUpdated});
      if(this.isValidArrayWithData(filterItem)){
        filterItem[0].weight=weight;
      }else{
        weights.push(historyData);
      }

    }

    this.dataChanged.emit(this._personDetails);
  }

  /**
   * Delegate toggle field state change based  on the mode (edit or readonly)
   */
  changeFieldState(){
    switch(this.mode){
      case "edit":
        this.enableOrDisableFormFields(false);
        break;
      case "readonly":
        this.enableOrDisableFormFields(true);
        break;
    }
  }

  /**
   * implements the field state change based on the flag provided.
   */
  enableOrDisableFormFields(disable:boolean){
    (disable)?this._profileForm.controls.name.disable():this._profileForm.controls.name.enable();
    (disable)?this._profileForm.controls.age.disable():this._profileForm.controls.age.enable();
    (disable)?this._profileForm.controls.weight.disable():this._profileForm.controls.weight.enable();
  }

}
