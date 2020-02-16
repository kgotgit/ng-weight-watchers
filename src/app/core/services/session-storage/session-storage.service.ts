import { Injectable } from '@angular/core';
import { StorageKeys } from '../../enums/storage-keys.enum';

import { MockDataService } from '../mock-data/mock-data.service';
import { Observable } from 'rxjs';
import { IPersonDetails } from 'src/app/features/models/person-details.interface';
import { map } from 'rxjs/operators';
import { BaseService } from '../../abstract-base/base.service';


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
        this.mockDataService.loadUsersFromAssets().pipe(//TODO: deviating from DRY principal see login.component.ts.          
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
}
