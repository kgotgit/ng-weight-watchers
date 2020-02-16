import {SubSink} from 'subsink';
import { Subject } from 'rxjs';

export abstract class AbstractBaseUtil{

    //Utility to add all subscriptions and destroy at once in ngOnDestroy to prevent any memory leaks
    protected subsink=new SubSink();

    //Compliementory to subsink to be used to inside rxjs pipe via takeUntil so that observable streams listen until the corresponding component is destroyed.
    protected _destroy$=new Subject();


    constructor(){
        
    }

    /**
   * Checks if the given object is an array with data
   * @param data
   */
  isValidArrayWithData(data: any) {
    if (data != null && typeof data != "undefined" && Array.isArray(data) && data.length > 0) {
      return true;
    }
    return false;
  }
  /**
   * Checks if the given object is an array with data
   * @param data
   */
  isValidArray(data:any){
    if(data!=null && typeof data!="undefined" && Array.isArray(data)){
      return true;
    }
    return false;
  }
  /**
   * Checks if the given data is valid i.e., not null, undefined and no empty string
   * @param data
   */
  hasValue(data: any) {
    if (data == null || data == undefined || data == "undefined" || data == "null" || data == 'Invalid Date') {
      return false
    }
    if (data != null && typeof data === "string" && data.trim().length == 0) {
      return false
    }
    return true
  }
  /**
   * Check if value is null or empty and returns empty string.
   * passed may be an array or string
   * @param value
   */
  getNullForEmtpy(value: any) {
    if (value != null && typeof value != "undefined") {
      return value;
    }
    return "";
  }
}