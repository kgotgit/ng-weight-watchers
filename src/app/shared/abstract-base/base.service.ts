import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoreInjectorService } from 'src/app/core/services/core-injector/core-injector.service';
import { ServiceRequest } from 'src/app/core/models/service-request.interface';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from 'src/app/core/models/service-response.interface';
import { tap } from 'rxjs/operators';
import { AbstractBaseUtil } from './base.util';

export abstract class BaseService extends AbstractBaseUtil{

    protected _http:HttpClient;
    protected _REST_URL="/weightwatchers/api/"
    protected _httpOptions={headers:new HttpHeaders({'content-type':'application/json'})};
    constructor(){
        super();
        //manually injection of using CoreInjectorService to avoid every child class passing an insance to parent.
        this._http=CoreInjectorService.injector.get(HttpClient);
        
    }

    /**
     * Used by child service classes to invoke post operation
     * @param url 
     * @param data 
     */
    invokePost(url:string,request:ServiceRequest<any>):Observable<ServiceResponse<any>>{
        return this._http.post<ServiceResponse<any>>(this._REST_URL+url,request.data,this._httpOptions).pipe(
            tap((response:ServiceResponse<any>)=>{
                //handle any error messages from service based on the handleError flag set by the caller.
                if(request.handleError===true){}
                if(this.hasValue(response)){
                   
                }
                
            })
        );
    }

    /**
     * Used by child service classes to invoke get operation
     * @param url 
     */
    invokeGet(url:string):Observable<ServiceResponse<any>>{
        return this._http.get<ServiceResponse<any>>(this._REST_URL+url).pipe(
            tap((response:ServiceResponse<any>)=>{
                 //handle any error messages from service based on the handleError flag set by the caller.

            })
        );
    }

    /**
     * Used by child service classes to invoke put operation
     * @param url 
     * @param data 
     */
    invokePut(url:string,data:ServiceRequest<any>):Observable<ServiceResponse<any>>{
        return this._http.put<ServiceResponse<any>>(this._REST_URL+url,data,this._httpOptions);
    }



    handleErrorsFromResponse(response:ServiceResponse<any>){

    }

    //TODO: Add for Delete
    //TODO: Add for Patch

}