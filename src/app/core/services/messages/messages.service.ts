import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MsgTypeEnum } from '../../enums/msg-type.enum';
import { IMessage } from '../../models/message.interface';
import { AbstractBaseUtil } from 'src/app/shared/abstract-base/base.util';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends AbstractBaseUtil{

  _msgSubject$=new Subject();
  
  constructor() {
    super();
   }

  /**
   * Emits single or multiple messages
   * @param msgs 
   */
  emitMessages(msgs:IMessage[]|IMessage){
    this._msgSubject$.next(msgs);
  }

  /**
   * Return messages stream observable
   */
  listenToMsgsStream(){
    return this._msgSubject$.asObservable();
  }

  /**
   * Build error messages array and emit
   * @param messages 
   */
  error(messages:string[]|string){
    this.emitMessages(this.buildMessages(MsgTypeEnum.ERROR,messages));
  }

  /**
   * Build error messages array and emit
   * @param messages 
   */
  success(messages:string[]|string){
    this.emitMessages(this.buildMessages(MsgTypeEnum.ERROR,messages));
  }

  /**
   * Build error messages array and emit
   * @param messages 
   */
  info(messages:string[]|string){
    this.emitMessages(this.buildMessages(MsgTypeEnum.ERROR,messages));
  }




  /**
   * Builds the messages required by the Message Component
   * @param type 
   * @param msgs 
   */
  buildMessages(type:MsgTypeEnum, msgs:string[]|string){
    let messages=null;
    //to check if msgs are of type array and has data in it
    if(this.isValidArrayWithData(msgs)){
      messages=new Array() as IMessage[];
      //type cast to string[]
      (<string[]>msgs).forEach((msg:string)=>{
        messages.push({"type":type,message:msg} as IMessage);
      });
    }
    else if(this.hasValue(msgs)){
      messages=new Array() as IMessage[];
      messages.push({"type":type,message:(<string>msgs)} as IMessage);
    }
    return messages;
  }
  



}
