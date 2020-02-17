import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { IPersonDetails } from 'src/app/features/models/person-details.interface';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/abstract-base/base.component';
import { PersonDetailsService } from 'src/app/features/services/person-details.service';
import { delay, takeUntil, map, tap } from 'rxjs/operators';
import { IWeightHistory } from 'src/app/features/models/weight-history.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent{


  _users$:Observable<IPersonDetails[]>;
  _mode:'home'|'addFriend'='home';
  _addNewPersonDetails:IPersonDetails;
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


 
  trackByid(index:number,item:IPersonDetails){
    return item.id;
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

  /**
   * 
   */
  addFriend(){
    this._addNewPersonDetails=new Object() as IPersonDetails;
    this._addNewPersonDetails.id=this.getUniqueId();
    this._addNewPersonDetails.history=new Array() as IWeightHistory[];
    this._mode='addFriend';
  }

  /**
   * 
   * @param ip 
   */
  dataChanged(ip:IPersonDetails){
    this._addNewPersonDetails=ip;
   this.personDetailsService.saveChanges(ip).pipe(delay(0),
   map((ips:IPersonDetails)=>{
    return ips;
   }),
   tap((ip:IPersonDetails)=>{
     this.loadUsersFromSesssion();
   })
   ).subscribe();
   this._mode='home';
  }

  /**
   * 
   */
  getUniqueId():number{
     return Math.floor(Math.random() * (99999 - 100000 + 1)) + 10000;
  }

  onCancelClicked(clicked:boolean){
    this._mode='home';
    this._addNewPersonDetails=null;
  }
}
