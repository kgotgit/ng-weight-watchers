import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/service-response.interface';
import { SessionStorageService } from '../services/session-storage/session-storage.service';
import { delay } from 'rxjs/operators';
import { url } from 'inspector';


@Injectable()
export class HttpMockInterceptor implements HttpInterceptor{
    constructor(private storageService:SessionStorageService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
      if(req.url.indexOf(".json")>-1){
        return next.handle(req);
      } else{
      return new Observable<HttpEvent<any>>(observer=>{
        let response:HttpResponse<any>;
        this.storageService.processRequestByUrl(req.url,req.body).pipe(delay(0)).subscribe((data:ServiceResponse<any>)=>{
          if(data!=null){
            response=new HttpResponse({status:200, body:data});
          }
          observer.next(response);
          observer.complete();
          
        });
       });   
      } 
    }
    
}