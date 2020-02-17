import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { IPersonDetails } from 'src/app/features/models/person-details.interface';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/abstract-base/base.component';
import { PersonDetailsService } from 'src/app/features/services/person-details.service';
import { delay, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent{


  _users$:Observable<IPersonDetails[]>;
  constructor(private router:Router,private personDetailsService:PersonDetailsService) {
    super();
   }


  ngOnInit(): void {
    this.loadUsersFromSesssion();
  }


  loadUsersFromSesssion(){
    this._users$=this._storageService.getUsersFromSession().pipe(
      delay(0),
      takeUntil(this._destroy$)
    );
  }


  /**
   *card clicked 
   */
  cardClicked(id:number){
    this.router.navigateByUrl("pages/dashboard/"+id);
  }

  /**
   * Card delete icon is clicked
   * @param id 
   */
  deleteClicked(id:number){
    this._users$=this.personDetailsService.deleteById(id).pipe(
      delay(0),
      takeUntil(this._destroy$),
      map((users:IPersonDetails[])=>{
        console.log(users);
        return users;
      })
    );

  }
}
