import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/abstract-base/base.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent extends BaseComponent {


  
  constructor() {
    super();
   }

  ngOnInit(): void {
  }

}
