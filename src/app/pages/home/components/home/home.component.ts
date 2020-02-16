import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/abstract-base/base.component';
import { Observable } from 'rxjs';
import { IPersonDetails } from 'src/app/features/models/person-details.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent{


  _users$:Observable<IPersonDetails[]>;
  constructor() {
    super();
   }


  ngOnInit(): void {
    this.loadUsersFromSesssion();
  }


  loadUsersFromSesssion(){
    this._users$=this._storageService.getUsersFromSession();
  }

}
