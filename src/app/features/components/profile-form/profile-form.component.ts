import { Component, OnInit, Input } from '@angular/core';
import { IPersonDetails } from '../../models/person-details.interface';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  constructor() { }

  @Input() personDetails:IPersonDetails; //holds data person details including weight history

  ngOnInit(): void {
  }

}
