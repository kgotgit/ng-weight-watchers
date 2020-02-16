import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { IPersonDetails } from 'src/app/features/models/person-details.interface';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/abstract-base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent{


  _users$:Observable<IPersonDetails[]>;
  constructor(private router:Router) {
    super();
   }


  ngOnInit(): void {
    this.loadUsersFromSesssion();
  }


  loadUsersFromSesssion(){
    this._users$=this._storageService.getUsersFromSession();
  }


  /**
   * 
   */
  cardClicked(id:number){
    this.router.navigateByUrl("pages/dashboard/"+id);
  }
}
