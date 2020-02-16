import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/abstract-base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  _loginForm:FormGroup;
  constructor(private fb:FormBuilder) { 
    super();
  }

  ngOnInit(): void {
    this.createFormGroup();
  }


  createFormGroup(){
    this._loginForm=this.fb.group({
      username:new FormControl({value:"",disabled:false},[Validators.required,Validators.maxLength(100)]),
      password: new FormControl({value:"",disabled:false},[Validators.required])
    
    });
  }

  get formControl(){
    return this._loginForm.controls;
  }

}
