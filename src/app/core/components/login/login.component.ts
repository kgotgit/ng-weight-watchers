import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/abstract-base/base.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPersonDetails } from 'src/app/features/models/person-details.interface';
import { MockDataService } from '../../services/mock-data/mock-data.service';
import { map, takeUntil } from 'rxjs/operators';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { StorageKeys } from '../../enums/storage-keys.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  _loginForm:FormGroup;
  _users$:Observable<IPersonDetails[]>;
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
      username:new FormControl({value:"",disabled:false},[Validators.required,Validators.maxLength(100)]),
      password: new FormControl({value:"",disabled:false},[Validators.required])
    
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
   this._users$=  new Observable<IPersonDetails[]>(observer=>{
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
      observer.next(users);
      observer.complete();
    })); 
   });
   
  }

  login(){
   
    this.router.navigateByUrl("/pages/home");
  }

}
