import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { IPersonDetails } from 'src/app/features/models/person-details.interface';
import { takeUntil, concatMap } from 'rxjs/operators';
import { PersonDetailsService } from 'src/app/features/services/person-details.service';
import { BaseComponent } from 'src/app/core/abstract-base/base.component';
import { IWeightHistory } from 'src/app/features/models/weight-history.interface';

@Component({
  selector: 'app-personal-dashboard',
  templateUrl: './personal-dashboard.component.html',
  styleUrls: ['./personal-dashboard.component.scss']
})
export class PersonalDashboardComponent extends BaseComponent {

  constructor(private activatedRoute:ActivatedRoute,private personDetailsService:PersonDetailsService) { 
    super();
  }

 _personDetails:IPersonDetails;
  _id:number;
  _iweights:IWeightHistory[];
  
  ngOnInit(): void {
    this.loadPersonDetails();
  }

  /**
   * get person Id from activated route and load data from session
   */
  loadPersonDetails(){
    this.getIdFromRoute().pipe(
      takeUntil(this._destroy$),
      concatMap((id:number)=>{
        return this.personDetailsService.getUserById(id);
      })).subscribe((data:IPersonDetails)=>{
        this._personDetails=data;
        this._iweights=[...this._personDetails.history];

      });

      


  }

  getIdFromRoute():Observable<number>{
    return new Observable<number>(observer=>{
      this.subsink.add(this.activatedRoute.params.subscribe(params=>{
        this._id=!isNaN(params['id'])?new Number(params['id']).valueOf():null;
        observer.next(this._id);
        observer.complete();
      }));
    });
  }


  dataChanged(ipersonDetails:IPersonDetails){
    this._personDetails=ipersonDetails;
    this._iweights=null;
    this._iweights=[...this._personDetails.history];
    this.personDetailsService.saveChanges(this._personDetails).subscribe();

  }


}
