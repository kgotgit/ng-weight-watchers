import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPersonDetails } from 'src/app/features/models/person-details.interface';
import { MockDataService } from '../../services/mock-data/mock-data.service';
import { map, takeUntil } from 'rxjs/operators';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { StorageKeys } from '../../enums/storage-keys.enum';
import { Router } from '@angular/router';
import { BaseComponent } from '../../abstract-base/base.component';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  _loginForm:FormGroup;
  _users:IPersonDetails[];
  _invalidUser:boolean=false;
  //For demo purpose only using mockData service to load users while login component is rendering
  constructor(private fb:FormBuilder,
              private mockDataService:MockDataService,
              private storageService:SessionStorageService,
              private router:Router) { 
    super();
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.loadUsers();
  }


  /**
   * To create reactive form group object
   */
  createFormGroup(){
    this._loginForm=this.fb.group({
      username:new FormControl({value:"",disabled:false},[Validators.required,Validators.maxLength(50)]),
      password: new FormControl({value:"",disabled:false},[Validators.required,Validators.maxLength(50)])
    
    });
  }
  /**
   * utility to get form control from form group
   */
  get formControl(){
    return this._loginForm.controls;
  }

  /**
   * Load mock data users from assets
   */
  loadUsers(){
  //
    this.mockDataService.loadUsersFromAssets().pipe(  
      //listen to this observer stream until component is destroyed. 
      takeUntil(this._destroy$),        
      map((data:any)=>{
        let users:IPersonDetails[]=null;
        if(this.isValidArrayWithData(data)){
          users=data as IPersonDetails[];
          this.storageService.setDataInSessionStroageForKey(StorageKeys.USER_PROFILES,users);
        } 
        return users;    
      })
    ).subscribe(((users:IPersonDetails[])=>{
      this._users=users;
    })); 
  
   
  }

  login(){
    let userName:string=this._loginForm.controls.username.value;
    let password=this._loginForm.controls.password.value;
    if(this.isValidArrayWithData(this._users)){
      let ip:IPersonDetails[]=this._users.filter((p:IPersonDetails)=>{return p.username==userName});
        if(this.isValidArrayWithData(ip)){
          let user:IUser=new Object() as IUser;
          user.username=userName;
          this._storageService.setDataInSessionStroageForKey(StorageKeys.CURRENT_USER,user);
          this.router.navigateByUrl("/pages/home");
          this._storageService.emitIsLoggedin(true);
        }else{
          this._invalidUser=true; 
        }
    }else{
      this._invalidUser=true; 
    }
      
  }

}
