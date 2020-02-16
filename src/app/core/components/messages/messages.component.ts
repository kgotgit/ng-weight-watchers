import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/shared/abstract-base/base.component';
import { IMessage } from '../../models/message.interface';
import { MessagesService } from '../../services/messages/messages.service';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent extends BaseComponent {


  @Input() _messages:IMessage[];

  
  //Flag to add or remove the messages section
  _showMsg:boolean=false;

  constructor(private msgService:MessagesService) {
    super();
   }

  ngOnInit(): void {
    this.listenToMessagesStream();
  }


  /**
   * Allows to track the message array by unique identifier which allows to update only dom changed rather than re-creating whole dome again.
   * Improves performance
   * @param index 
   * @param item 
   */
  trackBymsg(index:number,item:IMessage){
    return item.message;
  }

  /**
   * Listen to message stream emitted via MessageService
   */
  listenToMessagesStream(){
    //Added to global observable pool as it can be destoryed when component destroyed using base component ngOnDestroy() to prevent memory leaks.
    this.subsink.add(this.msgService.listenToMsgsStream().pipe(
      delay(0),//added some delay to avoid console error messages like value changed after component is checked
      map((msgs:IMessage[])=>{
        if(this.isValidArrayWithData(msgs)){
          this._messages=msgs;
          //set the flag to true if the valid messages are found
          this._showMsg=true;

        }else{
          this._messages=null;
          //set the flag to false if no messages are found
          this._showMsg=false;
        }
      })
      ).subscribe());
  }



}
