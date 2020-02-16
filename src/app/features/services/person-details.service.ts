import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/abstract-base/base.service';
import { Observable } from 'rxjs';
import { IPersonDetails } from '../models/person-details.interface';
import { ServiceUrls } from 'src/app/core/enums/service-url.enum';
import { ServiceResponse } from 'src/app/core/models/service-response.interface';
import {map} from 'rxjs/operators';

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
    let request=super.buildServiceRequest(ServiceUrls.GET_ALL_USERS,null);
    return super.invokeGet(request).pipe(
      map((response:ServiceResponse<any>)=>{
        if(response!=null){
          return response.data as IPersonDetails[];
        }
        return null;
      })
    );
  }
}
