import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/service-response.interface';
import { SessionStorageService } from '../services/session-storage/session-storage.service';


@Injectable()
export class HttpMockInterceptor implements HttpInterceptor{
    constructor(private storageService:SessionStorageService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        console.log(req.url);
      /*   let serviceResponse:ServiceResponse<any>=this.
        if(req.url.indexOf("")) */


        return next.handle(req);
    }
    
}