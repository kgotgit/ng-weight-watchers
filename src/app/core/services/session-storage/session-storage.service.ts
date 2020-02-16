import { Injectable } from '@angular/core';
import { StorageKeys } from '../../enums/storage-keys.enum';
import { AbstractBaseUtil } from 'src/app/shared/abstract-base/base.util';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService extends AbstractBaseUtil {

  constructor() {
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
}
