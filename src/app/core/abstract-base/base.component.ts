import { OnDestroy, OnInit } from '@angular/core';
import { AbstractBaseUtil } from './base.util';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { CoreInjectorService } from 'src/app/core/services/core-injector/core-injector.service';
import { delay, map } from 'rxjs/operators';

export abstract class BaseComponent extends AbstractBaseUtil implements OnInit, OnDestroy{
   
    
    _storageService:SessionStorageService;
    _isLoggedIn:boolean;
    constructor(){
        super();
        this._storageService=CoreInjectorService.injector.get(SessionStorageService);
    }

    /**
     * Child classes may override
     */
    ngOnInit(): void {
       this.listeToIsLoggedInStream();
    }

    listeToIsLoggedInStream(){
        this.subsink.add(this._storageService.listenToisLogged().pipe(
        delay(0),
        map((isLoggedIn:boolean)=>{
          this._isLoggedIn=isLoggedIn;
        })
        ).subscribe())
      }

    /**
     * Child classes may use subsink to add any observable stream subscriptons.
     * When method is override by child class, may call super.ngOnDestory() to clear all subscriptions 
     * added to subsink or _destory$ subject unless need to handle by itself. 
     */
    ngOnDestroy(): void {
        this.subsink.unsubscribe();
        this._destroy$.next();
        this._destroy$.complete();
    }
    
}