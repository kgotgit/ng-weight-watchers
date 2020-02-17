import { Injectable } from '@angular/core';
import { StorageKeys } from '../../enums/storage-keys.enum';

import { MockDataService } from '../mock-data/mock-data.service';
import { Observable } from 'rxjs';
import { IPersonDetails } from 'src/app/features/models/person-details.interface';
import { map, tap } from 'rxjs/operators';
import { BaseService } from '../../abstract-base/base.service';
import { ServiceResponse } from '../../models/service-response.interface';
import { ServiceUrls } from '../../enums/service-url.enum';
import { MessageEnum } from '../../enums/messages.enum';


@Injectable({
  providedIn: 'root'
})
export class SessionStorageService extends BaseService {

  constructor(private mockDataService:MockDataService) {
    super();
   }

  /**
   * Set the passed object browser's session stroage. 
   * @param key 
   * @param data 
   */
  setDataInSessionStroageForKey(key:StorageKeys,data:any){
   
    //ensure sessionStorage object is available
    if(this.hasValue(sessionStorage)){
      //stringify given data
      let json:string=JSON.stringify(data);
      //base 64 encode the given string and set to session based on the key
      sessionStorage.setItem(key,btoa(json));
    }
  }


  /**
   * Get data from session storage for given key
   * @param key 
   */
  getDataFromSessionStorageForKey(key:StorageKeys){
    let returnVal:any=null;
    //ensure sessionStroage object is available
    if(this.hasValue(sessionStorage)){
      let item=sessionStorage.getItem(key);
      if(this.hasValue(sessionStorage)){
        //decode and parse the string to json Object
        returnVal=JSON.parse(atob(item));
      }
    }
    return returnVal;
  }


  /**
   * Get all users from session stroage. 
   * If it doesn't exists in session storage then invoke service to get from backend as fallback mechanism
   */
  getUsersFromSession(): Observable<IPersonDetails[]> {
    return new Observable<IPersonDetails[]>(observer => {
      let users: IPersonDetails[] = this.getDataFromSessionStorageForKey(StorageKeys.USER_PROFILES) as IPersonDetails[];
      if (this.isValidArrayWithData(users)) {
        //data found call complete.
        observer.next(users);
        observer.complete();
      } else {
        this.mockDataService.loadUsersFromAssets().pipe(//TODO: deviating from DRY principle see login.component.ts.          
          map((data: any) => {
            let users: IPersonDetails[] = null;
            if (this.isValidArrayWithData(data)) {
              users = data as IPersonDetails[];
            }
            return users;
          })
        ).subscribe((data: IPersonDetails[]) => {
          //data recieved call complete
          observer.next(data);
          observer.complete();
        });
      }
    });
  }


  /**
   * Return an observable stream of IPersonalDetails for given id.
   * @param id 
   */
  getUserForGivenId(id:number):Observable<IPersonDetails>{
    return new Observable<IPersonDetails>(observer=>{
      //get all users from session
      this.getUsersFromSession().pipe(
        map((users:IPersonDetails[])=>{
            let user:IPersonDetails=null;
          if(this.isValidArrayWithData(users)){
            //Filter user by given id
            let filteredUser:IPersonDetails[]=users.filter((iuser:IPersonDetails)=>{return iuser.id===id});
            //set filtered user and return
            user=(this.isValidArrayWithData(filteredUser))?filteredUser[0]:null;
          }
            return user;
        })
      ).subscribe((data:IPersonDetails)=>{
        observer.next(data);
        observer.complete();
      })
    }); 
  }


  /**
   * Process requested url and respond with data accordingly.
   * @param url 
   * @param body 
   */
  processRequestByUrl(url:string,body:any):Observable<ServiceResponse<any>>{

    return new Observable<ServiceResponse<any>>(observer=>{
      let response:ServiceResponse<any>=null;
      //process get user by id url
      //added starting '/' and trainling '/' to reduce possibility of other url having same subset of string.
      if(url.indexOf("/"+ServiceUrls.GET_USER+"/")>-1){
        let splitUrl=url.split("/");
        let idStr:any=splitUrl[splitUrl.length-1];
        if(!isNaN(idStr)){
          this.getUserForGivenId(new Number(idStr).valueOf()).subscribe((data:IPersonDetails)=>{
            observer.next({success:true,data:data} as ServiceResponse<any>);
            observer.complete();
          })
        }
      }else if(url.indexOf("/"+ServiceUrls.SAVE_USER)>-1){
        //implement save operation
        let userDetails:IPersonDetails=body as IPersonDetails;
        this.updateUserDetailsIntoSession(userDetails);
        response={success:true,data:userDetails,errorMsgs:MessageEnum.NO_URL_FOUND} as ServiceResponse<any>;
        observer.next(response)
        observer.complete();
        console.log(body);
      }else if(url.indexOf("/"+ServiceUrls.DELETE_USER)>-1){
        //implement delete operation
      }else{
        response={success:false,data:null,errorMsgs:MessageEnum.NO_URL_FOUND} as ServiceResponse<any>;
        observer.next(response)
        observer.complete();
      }  

    });   

  }

  /**
   * Updates userdetails into session
   * @param iperson 
   */
  updateUserDetailsIntoSession(iperson:IPersonDetails){
    
    this.getUsersFromSession().pipe(
      tap((ips:IPersonDetails[])=>{
          let filteredItems:IPersonDetails[]=ips.filter((ip:IPersonDetails)=>{return ip.username!=iperson.username});
          if(this.isValidArrayWithData(filteredItems)){
            filteredItems.push(iperson);
            this.setDataInSessionStroageForKey(StorageKeys.USER_PROFILES,filteredItems);
          }else{
            ips.push(iperson);
            this.setDataInSessionStroageForKey(StorageKeys.USER_PROFILES,ips);
          }


      })).subscribe();

  }



}
