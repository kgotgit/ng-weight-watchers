import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IPersonDetails } from '../models/person-details.interface';
import { ServiceUrls } from 'src/app/core/enums/service-url.enum';
import { ServiceResponse } from 'src/app/core/models/service-response.interface';
import {map} from 'rxjs/operators';
import { BaseService } from 'src/app/core/abstract-base/base.service';

@Injectable({
  providedIn: 'root'
})
export class PersonDetailsService extends BaseService{

  constructor() {
    super();
   }

  

  /**
   * Get all users
   */
  getAllUsers():Observable<IPersonDetails[]>{
    let request=this.buildServiceRequest(ServiceUrls.GET_ALL_USERS,null);
    return this.invokeGet(request).pipe(
      map((response:ServiceResponse<any>)=>{
        if(response!=null){
          return response.data as IPersonDetails[];
        }
        return null;
      })
    );
  }

  /**
   * Get User information by id
   * @param id 
   */
  getUserById(id:number):Observable<IPersonDetails>{
    //To ensure that enum value is not changed
    let userURL=ServiceUrls.GET_USER.repeat(1)+"/"+id;
    let request=this.buildServiceRequest(userURL);
    return this.invokeGet(request).pipe(
      map((response:ServiceResponse<any>)=>{
        if(response!=null){
          return response.data as IPersonDetails;
        }
        return null;
      })
    );

  }

  /**
   * invoke service to save data
   * @param iPersonDetails 
   */
  saveChanges(iPersonDetails:IPersonDetails){
    let request=this.buildServiceRequest(ServiceUrls.SAVE_USER,iPersonDetails);
    return this.invokePost(request).pipe(
      map((response:ServiceResponse<any>)=>{
        if(response!=null){
          return response.data as IPersonDetails;
        }
        return null;
      })
    );
  }
}
