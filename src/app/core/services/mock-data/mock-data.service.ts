import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, takeUntil } from 'rxjs/operators';
import { AbstractBaseUtil } from '../../abstract-base/base.util';


@Injectable({
  providedIn: 'root'
})
export class MockDataService extends AbstractBaseUtil{
//This service doesn't extend the BaseService as it is used to load mock data file from /assets/data/user.json file
 _jsonUrl='assets/data/users.json';

  constructor(private http:HttpClient) {
    super();
   }


  loadUsersFromAssets(){
   return this.http.get(this._jsonUrl);
  }
}
