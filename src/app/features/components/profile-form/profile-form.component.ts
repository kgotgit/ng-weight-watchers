import { Component, OnInit, Input } from '@angular/core';
import { IPersonDetails } from '../../models/person-details.interface';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AbstractBaseUtil } from 'src/app/shared/abstract-base/base.util';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent extends AbstractBaseUtil implements OnInit {

  //form controls for a given form
  _profileForm:FormGroup;
  
  //person details including weight history
  @Input() personDetails:IPersonDetails=null;

  //mode to determine edit or readonly
  @Input() mode:'edit'|'readonly'='edit';
  
  //local variable to hold profile picture image data url
  _imgSrc:string;

  constructor(private fb:FormBuilder) {
    super();
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
      name:new FormControl({value:(this.hasValue(this.personDetails) && this.hasValue(this.personDetails.name))?this.personDetails.name:"",disabled:this.checkForMode()},[Validators.required]),
      dob:new FormControl({value:(this.hasValue(this.personDetails) && this.hasValue(this.personDetails.dob))?this.personDetails.dob:"",disabled:this.checkForMode()},[Validators.required]),
      age:new FormControl({value:(this.hasValue(this.personDetails) && this.hasValue(this.personDetails.age))?this.personDetails.age:"",disabled:this.checkForMode()},[Validators.required]),
      lastUpdated:new FormControl({value:(this.hasValue(this.personDetails) && this.hasValue(this.personDetails.lastUpdated))?this.personDetails.lastUpdated:"",disabled:true},[]),
      imgSrc: new FormControl({value:(this.hasValue(this.personDetails) && this.hasValue(this.personDetails.imgSrc))?this.personDetails.imgSrc:"",disabled:false},[])
    });
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

  onEdit(){

  }

  onSave(){
    
  }
}
