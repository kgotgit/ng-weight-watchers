import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, takeUntil } from 'rxjs/operators';
import { AbstractBaseUtil } from 'src/app/shared/abstract-base/base.util';
import { IPersonDetails } from 'src/app/features/models/person-details.interface';

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
   return this.http.get(this._jsonUrl);/* .pipe(
          
      map((data:any)=>{
        let users:IPersonDetails[]=null;
        if(this.isValidArrayWithData(data)){
          users=data as IPersonDetails[];
        } 
        return users;    
      })
    ).subscribe(); */
  }
}
