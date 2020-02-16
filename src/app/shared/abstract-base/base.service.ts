import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoreInjectorService } from 'src/app/core/services/core-injector/core-injector.service';
import { ServiceRequest } from 'src/app/core/models/service-request.interface';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from 'src/app/core/models/service-response.interface';

export abstract class BaseService{

    protected _http:HttpClient;
    protected _REST_URL="/weightwatchers/api/"
    protected _httpOptions={headers:new HttpHeaders({'content-type':'application/json'})};
    constructor(){
        //manually injection of using CoreInjectorService to avoid every child class passing an insance to parent.
        this._http=CoreInjectorService.injector.get(HttpClient);
    }

    /**
     * Used by child service classes to invoke post operation
     * @param url 
     * @param data 
     */
    invokePost(url:string,data:ServiceRequest<Type<any>>):Observable<ServiceResponse<Type<any>>>{
        return this._http.post<ServiceResponse<Type<any>>>(this._REST_URL+url,data,this._httpOptions);
    }

    /**
     * Used by child service classes to invoke get operation
     * @param url 
     */
    invokeGet(url:string):Observable<ServiceResponse<Type<any>>>{
        return this._http.get<ServiceResponse<Type<any>>>(this._REST_URL+url);
    }

    /**
     * Used by child service classes to invoke put operation
     * @param url 
     * @param data 
     */
    invokePut(url:string,data:ServiceRequest<Type<any>>):Observable<ServiceResponse<Type<any>>>{
        return this._http.put<ServiceResponse<Type<any>>>(this._REST_URL+url,data,this._httpOptions);
    }

    //TODO: Add for Delete
    //TODO: Add for Patch

}