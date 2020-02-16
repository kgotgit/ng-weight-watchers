import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoreInjectorService } from 'src/app/core/services/core-injector/core-injector.service';
import { ServiceRequest } from 'src/app/core/models/service-request.interface';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from 'src/app/core/models/service-response.interface';
import { tap } from 'rxjs/operators';
import { AbstractBaseUtil } from './base.util';
import { IMessage } from 'src/app/core/models/message.interface';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { MsgTypeEnum } from 'src/app/core/enums/msg-type.enum';

export abstract class BaseService extends AbstractBaseUtil{

    protected _http:HttpClient;
    protected _msgService:MessagesService;
    protected _REST_URL="/weightwatchers/api/"
    protected _httpOptions={headers:new HttpHeaders({'content-type':'application/json'})};
    constructor(){
        super();
        //manually injection of using CoreInjectorService to avoid every child class passing an insance to parent.
        this._http=CoreInjectorService.injector.get(HttpClient);
        this._msgService=CoreInjectorService.injector.get(MessagesService);
        
    }

    /**
     * Used by child service classes to invoke post operation
     * @param url 
     * @param data 
     */
    invokePost(request:ServiceRequest<any>):Observable<ServiceResponse<any>>{
        return this._http.post<ServiceResponse<any>>(this._REST_URL+request.url,request.data,this._httpOptions).pipe(
            tap((response:ServiceResponse<any>)=>{
                 //handle any error messages from service based on the handleError flag set by the caller.
                 this.handleMessagesFromResponse(request,response);
                
            })
        );
    }

    /**
     * Used by child service classes to invoke get operation
     * @param url 
     */
    invokeGet(request:ServiceRequest<any>):Observable<ServiceResponse<any>>{
        return this._http.get<ServiceResponse<any>>(this._REST_URL+request.url).pipe(
            tap((response:ServiceResponse<any>)=>{//side effect
                 //handle any error messages from service based on the handleError flag set by the caller.
                this.handleMessagesFromResponse(request,response);
            })
        );
    }

    /**
     * Used by child service classes to invoke put operation
     * @param url 
     * @param data 
     */
    invokePut(request:ServiceRequest<any>):Observable<ServiceResponse<any>>{
        return this._http.put<ServiceResponse<any>>(this._REST_URL+request.url,request.data,this._httpOptions).pipe(
            tap((response:ServiceResponse<any>)=>{//side effect
                //handle any error messages from service based on the handleError flag set by the caller.
               this.handleMessagesFromResponse(request,response);
           })
        );
    }


    //TODO: Add for Delete
    //TODO: Add for Patch

    /**
     * To show messages is messages section based on the flag int by the request object
     * @param request 
     * @param response 
     */
    handleMessagesFromResponse(request:ServiceRequest<any>, response:ServiceResponse<any>){
        if(request && request.handleMessages){
            if(response){
                let msgs:IMessage[]=new Array() as IMessage[];
                //service may return combination of messages
                msgs.concat(this._msgService.buildMessages(MsgTypeEnum.ERROR,response.errorMsgs))
                    .concat(this._msgService.buildMessages(MsgTypeEnum.SUCCESS,response.successMsgs))
                    .concat(this._msgService.buildMessages(MsgTypeEnum.INFO,response.infoMsgs))
                
                if(this.isValidArrayWithData(msgs)){
                    this._msgService.showMessages(msgs);
                }
            }
        }


    }

    /**
     * Builds the service request object
     * @param url 
     * @param data 
     * @param handleMessages 
     */
    buildServiceRequest(url:string,data:any=null,handleMessages:boolean=true){
        return {url:url,data:data,handleMessages:handleMessages} as ServiceRequest<any>;
    }


}